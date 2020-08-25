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

describe('Lists', () => {
  let client;
  let listName;
  let listNameNew;
  let listId;

  beforeAll(() => {
    client = require('../../swagger-out/marketing-javascript/src');
    client.setConfig({ apiKey, server });

    timestamp = Date.now();
    listName = `TestListNodeA_${timestamp}`;
    listNameNew = `TestListNodeB_${timestamp}`;
  });

  it('can get all lists', async () => {
    const resp = await client.lists.getAllLists();
    expect(Array.isArray(resp.lists)).toBe(true);
  });

  it('can create a new list', async () => {
    const resp = await client.lists.createList({
      name: listName,
      permission_reminder: 'permission_reminder',
      email_type_option: true,
      contact: {
        company: 'Acme Company',
        address1: '206 Washington St SW',
        city: 'Atlanta',
        state: 'GA',
        zip: '30334',
        country: 'US',
      },
      campaign_defaults: {
        from_name: 'Jane Doe',
        from_email: 'janedoe@mailchimp.com',
        subject: 'A Test Campaign',
        language: 'EN_US',
      },
    });
    listId = resp.id;
    expect(typeof listId === 'string').toBe(true);
    expect(resp.name === listName).toBe(true);
  });

  it('can get a single list', async () => {
    const resp = await client.lists.getList(listId);
    expect(resp.name).toBe(listName);
  });

  it('can update a single list', async () => {
    const resp = await client.lists.updateList(listId, { name: listNameNew });
    expect(resp.name).toBe(listNameNew);
  });

  it('can delete a single list', async () => {
    const resp = await client.lists.deleteList(listId);
    expect(resp).toBe(null);
  });
});
