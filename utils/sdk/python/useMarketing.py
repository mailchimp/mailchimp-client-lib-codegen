import mailchimp_marketing as MailchimpMarketing
from mailchimp_marketing.api_client import ApiClientError 

import os
from dotenv import load_dotenv
load_dotenv()

try:
  client = MailchimpMarketing.Client()
  client.setConfig(os.getenv('API_KEY'), os.getenv('API_SERVER'))
  response = client.ping.get()
  print('client.ping.get() response: {}'.format(response))
except ApiClientError as error:
  print('An exception occurred: {}'.format(error.text))

try:
  client = MailchimpMarketing.Client()
  client.setConfig(os.getenv('MARKETING_KEY'), os.getenv('MARKETING_SERVER'))
  response = client.lists.getList('254844adc9')
  print('client.lists.getList() response: {}'.format(response))
except ApiClientError as error:
  print('An exception occurred: {}'.format(error.text))