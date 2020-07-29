const core = require('@actions/core');

const path = require('path');
const { existsSync, readFileSync, writeFileSync } = require('fs');
const swaggerToTS = require('@manifoldco/swagger-to-ts');
const editJsonFile = require('edit-json-file');

const fail = (reason) => {
  core.setFailed(reason);
  return 1;
};

async function generateTypes(specFile, outDir) {
  try {
    if (!existsSync(specFile)) {
      throw new Error(`unable to spec at ${specFile}`);
    }

    const input = JSON.parse(readFileSync(specFile, 'utf8'));
    console.log({ input });
    const output = swaggerToTS.default(input);

    console.log({ input, output, outDir });
    writeFileSync(`${outDir}/types.d.ts`, output);
  } catch (err) {
    throw new Error(
      `Failed to generate types from spec at ${specFile}: ${err.message}`
    );
  }
}

async function modifyPackageJson(packageFile) {
  try {
    if (!existsSync(packageFile)) {
      throw new Error(`unable to find package.json at ${packageFile}`);
    }

    const file = editJsonFile(packageFile);
    file.set('types', 'types.d.ts');
    file.save();
  } catch (err) {
    throw err;
  }
}

async function run() {
  try {
    const { api } = require('yargs').argv;

    const root = path.resolve(__dirname, '../..');
    const specFile = path.resolve(root, `spec/${api}.json`);
    const outDir = path.resolve(root, `swagger-out/${api}-javascript`);
    const packageFile = path.resolve(root, `${outDir}/package.json`);

    if (!existsSync(outDir)) {
      return fail(`unable to find SDK at ${outDir}`);
    }

    await generateTypes(specFile, outDir); // injests OAS file to generate types file
    await modifyPackageJson(packageFile); // adds 'types' field in package.json to point to newly generated types
    console.log(`✅ Successfully generated types for ${api} at ${outDir}`);
  } catch (err) {
    return fail(err.message);
  }
}

run();
