require_relative '../../swagger-out/marketing-ruby/lib/MailchimpMarketing.rb'

MARKETING_API_KEY = ENV['MARKETING_API_KEY']
MARKETING_ACCESS_TOKEN = ENV['MARKETING_ACCESS_TOKEN']
MARKETING_SERVER = ENV['MARKETING_SERVER']

describe MailchimpMarketing do
  context "Authentication" do
    it "can read environment variables" do
      expect(MARKETING_API_KEY.instance_of?(String)).to eq(true)
      expect(MARKETING_ACCESS_TOKEN.instance_of?(String)).to eq(true)
      expect(MARKETING_SERVER.instance_of?(String)).to eq(true)
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
end
