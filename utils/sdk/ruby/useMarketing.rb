require 'MailchimpMarketing'
require 'dotenv/load'

begin
  client = MailchimpMarketing::Client.new()
  client.set_config(ENV['MARKETING_KEY'], ENV['MARKETING_SERVER'])
  result = client.ping.get()
  p result
rescue MailchimpMarketing::ApiError => e
  puts "Error: #{e}"
end

begin
  client = MailchimpMarketing::Client.new()
  client.set_config(ENV['MARKETING_KEY'], ENV['MARKETING_SERVER'])
  result = client.lists.getList('254844adc9')
  p result
rescue MailchimpMarketing::ApiError => e
  puts "Error: #{e}"
end