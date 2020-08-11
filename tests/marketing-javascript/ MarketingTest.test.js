require('dotenv').config();

const apiKey = process.env.MARKETING_API_KEY;
const accessToken = process.env.MARKETING_ACCESS_TOKEN;
const server = process.env.MARKETING_SERVER;

describe('Authorization', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it('can read environment variables', () => {
    expect(typeof apiKey === 'string').toBe(true);
    expect(typeof accessToken === 'string').toBe(true);
    expect(typeof server === 'string').toBe(true);
  });

  it('can authorize using Basic Auth', async () => {
    const client = require('../../swagger-out/marketing-javascript/src');
    client.setConfig({ apiKey, server });

    const resp = await client.ping.get();
    expect(resp.health_status).toBe("Everything's Chimpy!");
  });

  it('can authorize using OAuth 2.0', async () => {
    const client = require('../../swagger-out/marketing-javascript/src');
    client.setConfig({ accessToken, server });

    const resp = await client.ping.get();
    expect(resp.health_status).toBe("Everything's Chimpy!");
  });
});
