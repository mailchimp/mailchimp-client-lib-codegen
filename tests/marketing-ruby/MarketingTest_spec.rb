require_relative '../../swagger-out/marketing-ruby/lib/MailchimpMarketing.rb'

MARKETING_API_KEY = ENV['MARKETING_API_KEY']
MARKETING_ACCESS_TOKEN = ENV['MARKETING_ACCESS_TOKEN']
MARKETING_SERVER = ENV['MARKETING_SERVER']

describe MailchimpMarketing do
  context "Authentication" do
    it "can read environment variables" do
      expect(MARKETING_API_KEY.instance_of?(String)).to be true
      expect(MARKETING_ACCESS_TOKEN.instance_of?(String)).to be true
      expect(MARKETING_SERVER.instance_of?(String)).to be true
    end

    it "can authenticate using Basic Auth via init" do
      client = MailchimpMarketing::Client.new({
        api_key: MARKETING_API_KEY,
        server: MARKETING_SERVER
      })

      resp = client.ping.get
      expect("Everything's Chimpy!").to eq(resp['health_status'])
    end

    it "can authenticate using Basic Auth via set_config" do
      client = MailchimpMarketing::Client.new
      client.set_config({
        api_key: MARKETING_API_KEY,
        server: MARKETING_SERVER
      })

      resp = client.ping.get
      expect("Everything's Chimpy!").to eq(resp['health_status'])
    end

    it "can authenticate using OAuth via init" do
      client = MailchimpMarketing::Client.new({
        access_token: MARKETING_ACCESS_TOKEN,
        server: MARKETING_SERVER
      })

      resp = client.ping.get
      expect("Everything's Chimpy!").to eq(resp['health_status'])
    end

    it "can authenticate using OAuth via set_config" do
      client = MailchimpMarketing::Client.new
      client.set_config({
        access_token: MARKETING_ACCESS_TOKEN,
        server: MARKETING_SERVER
      })

      resp = client.ping.get
      expect("Everything's Chimpy!").to eq(resp['health_status'])
    end
  end

  context "Lists" do
    list_id = nil
    list_name = "TestListRubyA"
    list_name_new = "TestListRubyB"

    before(:context) do
      @client = MailchimpMarketing::Client.new
      @client.set_config({
        access_token: MARKETING_ACCESS_TOKEN,
        server: MARKETING_SERVER
      })
    end

    it "can get all lists" do
      resp = @client.lists.get_all_lists
      expect(resp['lists'].kind_of?(Array)).to be true
    end

    it "can create a new list" do
      resp = @client.lists.create_list({
        name: list_name,
        permission_reminder: 'permission_reminder',
        email_type_option: true,
        contact: {
          company: 'Acme Company',
          address1: '206 Washington St SW',
          city: 'Atlanta',
          state: 'GA',
          zip: '30334',
          country: 'US'
        },
        campaign_defaults: {
          from_name: 'Jane Doe',
          from_email: 'janedoe@mailchimp.com',
          subject: 'A Test Campaign',
          language: 'EN_US'
        }
      })

      list_id = resp['id']
      expect(list_id.kind_of?(String)).to be true
      expect(resp['name'] == list_name).to be true
    end

    it "can get a single list" do
      resp = @client.lists.get_list(list_id)
      expect(resp['name'] == list_name).to be true
    end

    it "can update a single list" do
      resp = @client.lists.update_list(list_id, { name: list_name_new })
      expect(resp['name'] == list_name_new).to be true
    end

    it "can delete a single list" do
      resp = @client.lists.delete_list(list_id)
      expect(resp).to eq('success')
    end
  end
end
