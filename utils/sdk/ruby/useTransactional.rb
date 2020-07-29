require 'MailchimpTransactional'
require 'dotenv/load'

begin
  client = MailchimpTransactional::Client.new(ENV['TRANSACTIONAL_KEY'])
  result = client.users.ping() # => 'PONG!'
  p result
rescue MailchimpTransactional::ApiError => e
  puts "Error: #{e}"
end