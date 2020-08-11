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
