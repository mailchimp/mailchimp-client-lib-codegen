import mailchimp_transactional as MailchimpTransactional
from mailchimp_transactional.api_client import ApiClientError 

import os
from dotenv import load_dotenv
load_dotenv()

try:
  client = MailchimpTransactional.Client(os.getenv('TRANSACTIONAL_KEY'))
  response = client.users.ping()
  print('client.users.ping() response: {}'.format(response))
except ApiClientError as error:
  print('An exception occurred: {}'.format(error.text))

try:
  client = MailchimpTransactional.Client()
  client.set_api_key(os.getenv('TRANSACTIONAL_KEY'))
  response = client.users.ping()
  print('client.users.ping() response: {}'.format(response))
except ApiClientError as error:
  print('An exception occurred: {}'.format(error.text))