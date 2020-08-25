require('dotenv').config();

const apiKey = process.env.TRANSACTIONAL_API_KEY;

describe('Authorization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('can read environment variables', () => {
    expect(typeof apiKey === 'string').toBe(true);
  });

  it('can send authorized request', async () => {
    const client = require('../../swagger-out/transactional-javascript/src')(
      apiKey
    );
    const resp = await client.users.ping();
    expect(resp).toBe('PONG!');
  });
});

describe('Templates', () => {
  let client;
  let templateName;
  let templateSubjectA;
  let templateSubjectB;

  beforeAll(() => {
    client = require('../../swagger-out/transactional-javascript/src')(apiKey);
    timestamp = Date.now();
    templateName = `TemplateNode_${timestamp}`;
    templateSubjectA = `TemplateNodeSubjectA_${timestamp}`;
    templateSubjectB = `TemplateNodeSubjectB_${timestamp}`;
  });

  it('can list all templates', async () => {
    const resp = await client.templates.list();
    expect(Array.isArray(resp)).toBe(true);
  });

  it('can add a template', async () => {
    const resp = await client.templates.add({
      name: templateName,
      subject: templateSubjectA,
    });
    expect(resp.name).toBe(templateName);
    expect(resp.subject).toBe(templateSubjectA);
  });

  it('can get template info', async () => {
    const resp = await client.templates.info({ name: templateName });
    expect(resp.name).toBe(templateName);
    expect(resp.subject).toBe(templateSubjectA);
  });

  it('can update a template', async () => {
    const resp = await client.templates.update({
      name: templateName,
      subject: templateSubjectB,
    });
    expect(resp.name).toBe(templateName);
    expect(resp.subject).toBe(templateSubjectB);
  });

  it('can delete a template', async () => {
    const resp = await client.templates.delete({ name: templateName });
    expect(resp.name).toBe(templateName);
  });
});
