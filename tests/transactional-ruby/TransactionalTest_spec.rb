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

  context "Templates" do
    templateName = nil;
    templateSubjectA = nil;
    templateSubjectB = nil;

    before(:context) do
      @client = MailchimpTransactional::Client.new
      @client.set_api_key(TRANSACTIONAL_API_KEY)

      timestamp = Time.now
      templateName = "TemplateRuby_#{timestamp}"
      templateSubjectA = "TemplateRubySubjectA_#{timestamp}"
      templateSubjectB = "TemplateRubySubjectB_#{timestamp}"
    end

    it "can list all templates" do
      resp = @client.templates.list
      expect(resp.kind_of?(Array)).to be true
    end

    it "can add a template" do
      resp = @client.templates.add({
        name: templateName,
        subject: templateSubjectA,
      });
      expect(resp['name']).to eq templateName
      expect(resp['subject']).to eq templateSubjectA
    end

    it "can get template info" do
      resp = @client.templates.info({ name: templateName });
      expect(resp['name']).to eq templateName
      expect(resp['subject']).to eq templateSubjectA
    end

    it "can update a template" do
      resp = @client.templates.update({
        name: templateName,
        subject: templateSubjectB
      });
      expect(resp['name']).to eq templateName
      expect(resp['subject']).to eq templateSubjectB
    end

    it "can delete a template" do
      resp = @client.templates.delete({ name: templateName });
      expect(resp['name']).to eq templateName
    end
  end
end
