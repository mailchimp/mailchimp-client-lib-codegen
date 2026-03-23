#!/usr/bin/env node

/**
 * Derives spec/transactional.json (Swagger 2.0) from spec/transactional.openapi.json (OAS 3.x).
 *
 * Runs as 4 discrete passes, each producing a committable diff:
 *   pass1  Formatting   — reformat JSON to consistent 2-space multiline style
 *   pass2  Requests     — sync request body schemas from OAS3 (allOf + inlined $refs)
 *   pass3  Responses    — sync response schemas from OAS3 (required, examples, additionalProperties)
 *   pass4  Descriptions — sync summaries and descriptions from OAS3
 *   all    (default)    — run all 4 passes in sequence
 *
 * Usage:
 *   node utils/openapi-to-swagger.js [pass1|pass2|pass3|pass4|all]
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SWAGGER_PATH = path.join(ROOT, 'spec/transactional.json');
const OAS3_PATH = path.join(ROOT, 'spec/transactional.openapi.json');

const pass = process.argv[2] || 'all';

// ─── helpers ──────────────────────────────────────────────────────────────────

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n');
}

function resolveRef(ref, doc) {
  const parts = ref.replace(/^#\//, '').split('/');
  let node = doc;
  for (const part of parts) {
    node = node[part.replace(/~1/g, '/').replace(/~0/g, '~')];
    if (node === undefined) throw new Error(`Cannot resolve $ref: ${ref}`);
  }
  return node;
}

// OAS3-only keywords with no Swagger 2.0 equivalent
const OAS3_ONLY = new Set([
  'nullable', 'discriminator', 'writeOnly', 'readOnly',
  'deprecated', 'externalDocs', 'const',
]);

/**
 * Recursively inline all $refs and strip OAS3-only constructs, producing
 * a Swagger 2.0-compatible schema.
 */
function inlineRefs(node, doc, visited = new Set()) {
  if (node === null || typeof node !== 'object') return node;
  if (Array.isArray(node)) return node.map((item) => inlineRefs(item, doc, visited));

  if (node.$ref) {
    const ref = node.$ref;
    if (visited.has(ref)) return { type: 'object' };
    const resolved = resolveRef(ref, doc);
    visited.add(ref);
    const result = inlineRefs(resolved, doc, visited);
    visited.delete(ref);
    return result;
  }

  // OAS3.1 nullable: oneOf/anyOf with a null variant → collapse to non-null type
  if (node.oneOf || node.anyOf) {
    const variants = node.oneOf || node.anyOf;
    const nonNull = variants.filter((v) => v.type !== 'null' && v.type !== null);
    const { oneOf, anyOf, ...rest } = node;
    if (nonNull.length === 1) {
      return inlineRefs({ ...nonNull[0], ...rest }, doc, visited);
    }
    return inlineRefs(rest, doc, visited);
  }

  const result = {};
  for (const [key, value] of Object.entries(node)) {
    if (OAS3_ONLY.has(key)) continue;
    // OAS3.1 nullable array type: ["string", "null"] → "string"
    if (key === 'type' && Array.isArray(value)) {
      const nonNull = value.filter((t) => t !== 'null');
      result[key] = nonNull.length >= 1 ? nonNull[0] : 'string';
      continue;
    }
    result[key] = inlineRefs(value, doc, visited);
  }
  return result;
}

/**
 * Merge an allOf array into a single flat Swagger 2.0 schema.
 * Resolves $refs and merges required + properties.
 */
function flattenAllOf(allOfArray, doc) {
  const merged = { type: 'object', required: [], properties: {} };
  for (const sub of allOfArray) {
    const resolved = inlineRefs(sub, doc);
    if (resolved.required) merged.required.push(...resolved.required);
    if (resolved.properties) Object.assign(merged.properties, resolved.properties);
    if (resolved.description && !merged.description) merged.description = resolved.description;
  }
  if (merged.required.length === 0) delete merged.required;
  return merged;
}

/**
 * Given an OAS3 requestBody object, return a flattened Swagger 2.0 body parameter schema.
 * Handles: top-level $ref, allOf, and plain inline schemas.
 */
function oas3RequestSchema(requestBody, oas3) {
  if (!requestBody) return null;
  let schema = requestBody.content?.['application/json']?.schema;
  if (!schema) return null;

  // Resolve top-level $ref first
  if (schema.$ref) schema = inlineRefs(schema, oas3);

  // Now flatten allOf if present
  if (schema.allOf) return flattenAllOf(schema.allOf, oas3);

  return inlineRefs(schema, oas3);
}

/**
 * Given an OAS3 responses object, return a Swagger 2.0-compatible 200 response schema.
 */
function oas3ResponseSchema(responses, oas3) {
  const r200 = responses?.['200'];
  if (!r200) return null;
  let schema = r200.content?.['application/json']?.schema;
  if (!schema) return null;

  if (schema.$ref) schema = inlineRefs(schema, oas3);
  if (schema.allOf) return flattenAllOf(schema.allOf, oas3);
  return inlineRefs(schema, oas3);
}

// ─── pass 1: formatting ───────────────────────────────────────────────────────

function pass1() {
  const swagger = readJson(SWAGGER_PATH);
  writeJson(SWAGGER_PATH, swagger);
  console.log('✅ pass1: formatting done');
}

// ─── pass 2: request body schemas ────────────────────────────────────────────

function pass2() {
  const swagger = readJson(SWAGGER_PATH);
  const oas3 = readJson(OAS3_PATH);

  for (const [pathKey, pathItem] of Object.entries(swagger.paths)) {
    for (const [method, op] of Object.entries(pathItem)) {
      const oas3Op = oas3.paths[pathKey]?.[method];
      if (!oas3Op?.requestBody) continue;

      const newSchema = oas3RequestSchema(oas3Op.requestBody, oas3);
      if (!newSchema) continue;

      const bodyParam = op.parameters?.find((p) => p.in === 'body');
      if (bodyParam) {
        bodyParam.schema = newSchema;
      }
    }
  }

  writeJson(SWAGGER_PATH, swagger);
  console.log('✅ pass2: request body schemas done');
}

// ─── pass 3: response schemas ─────────────────────────────────────────────────

function pass3() {
  const swagger = readJson(SWAGGER_PATH);
  const oas3 = readJson(OAS3_PATH);

  for (const [pathKey, pathItem] of Object.entries(swagger.paths)) {
    for (const [method, op] of Object.entries(pathItem)) {
      const oas3Op = oas3.paths[pathKey]?.[method];
      if (!oas3Op?.responses) continue;

      const newSchema = oas3ResponseSchema(oas3Op.responses, oas3);
      if (!newSchema) continue;

      const r200desc = oas3Op.responses['200']?.description || '';
      op.responses['200'] = { description: r200desc, schema: newSchema };
    }
  }

  writeJson(SWAGGER_PATH, swagger);
  console.log('✅ pass3: response schemas done');
}

// ─── pass 4: descriptions ─────────────────────────────────────────────────────

function pass4() {
  const swagger = readJson(SWAGGER_PATH);
  const oas3 = readJson(OAS3_PATH);

  for (const [pathKey, pathItem] of Object.entries(swagger.paths)) {
    for (const [method, op] of Object.entries(pathItem)) {
      const oas3Op = oas3.paths[pathKey]?.[method];
      if (!oas3Op) continue;

      if (oas3Op.summary) op.summary = oas3Op.summary;
      if (oas3Op.description) op.description = oas3Op.description;
    }
  }

  writeJson(SWAGGER_PATH, swagger);
  console.log('✅ pass4: descriptions done');
}

// ─── main ─────────────────────────────────────────────────────────────────────

const passes = { pass1, pass2, pass3, pass4 };

if (pass === 'all') {
  pass1(); pass2(); pass3(); pass4();
} else if (passes[pass]) {
  passes[pass]();
} else {
  console.error(`Unknown pass: ${pass}. Use pass1, pass2, pass3, pass4, or all.`);
  process.exit(1);
}
