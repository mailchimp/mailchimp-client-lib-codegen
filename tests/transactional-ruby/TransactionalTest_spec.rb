require_relative '../../swagger-out/transactional-ruby/lib/MailchimpTransactional.rb'

TRANSACTIONAL_API_KEY = ENV['TRANSACTIONAL_API_KEY']

describe MailchimpTransactional do
  context "Authentication" do
    it "can authenticate via init" do
      client = MailchimpTransactional::Client.new(TRANSACTIONAL_API_KEY)

      resp = client.users.ping
      expect("PONG!").to eq(resp)
    end

    it "can authenticate via set_api_key" do
      client = MailchimpTransactional::Client.new
      client.set_api_key(TRANSACTIONAL_API_KEY)

      resp = client.users.ping
      expect("PONG!").to eq(resp)
    end
  end
end
