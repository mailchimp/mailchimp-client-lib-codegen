import os
import sys
import unittest
import importlib
from importlib import util
from dotenv import load_dotenv

# load environment vars
load_dotenv()
MARKETING_API_KEY = os.getenv('MARKETING_API_KEY')
MARKETING_ACCESS_TOKEN = os.getenv('MARKETING_ACCESS_TOKEN')
MARKETING_SERVER = os.getenv('MARKETING_SERVER')

# load module
sys.path.append("../../swagger-out/marketing-python/mailchimp_marketing/__init__.py")
spec = importlib.util.spec_from_file_location("mailchimp_marketing", "../../swagger-out/marketing-python/mailchimp_marketing/__init__.py")
mailchimp_marketing = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = mailchimp_marketing
spec.loader.exec_module(mailchimp_marketing)

class TestMailchimpMarketing(unittest.TestCase):
    def test_can_read_environment_vars(self):
      self.assertTrue(isinstance(MARKETING_API_KEY, str))
      self.assertTrue(isinstance(MARKETING_ACCESS_TOKEN, str))
      self.assertTrue(isinstance(MARKETING_SERVER, str))

    def test_basic_auth_via_init(self):
      client = mailchimp_marketing.Client({
        "api_key": MARKETING_API_KEY,
        "server": MARKETING_SERVER
      })
      resp = client.ping.get()
      data = resp.get('health_status')
      self.assertEqual(data, "Everything's Chimpy!")

    def test_basic_auth_via_set_config(self):
      client = mailchimp_marketing.Client()
      client.set_config({
        "api_key": MARKETING_API_KEY,
        "server": MARKETING_SERVER
      })
      resp = client.ping.get()
      data = resp.get('health_status')
      self.assertEqual(data, "Everything's Chimpy!")

    def test_oauth_via_init(self):
      client = mailchimp_marketing.Client({
        "access_token": MARKETING_ACCESS_TOKEN,
        "server": MARKETING_SERVER
      })
      resp = client.ping.get()
      data = resp.get('health_status')
      self.assertEqual(data, "Everything's Chimpy!")

    def test_oauth_via_set_config(self):
      client = mailchimp_marketing.Client()
      client.set_config({
        "access_token": MARKETING_ACCESS_TOKEN,
        "server": MARKETING_SERVER
      })
      resp = client.ping.get()
      data = resp.get('health_status')
      self.assertEqual(data, "Everything's Chimpy!")

    def test_full_audience_cycle(self):
      client = mailchimp_marketing.Client({
        "api_key": MARKETING_API_KEY,
        "server": MARKETING_SERVER
      })

      # 1. Get all lists
      respA = client.lists.get_all_lists()
      self.assertTrue(type(respA.get('lists')) == list)

      # 2. Create new list
      list_name = "TestListPythonA"
      respB = client.lists.create_list({
        'name': list_name,
        'permission_reminder': 'permission_reminder',
        'email_type_option': True,
        'contact': {
          'company': 'Acme Company',
          'address1': '206 Washington St SW',
          'city': 'Atlanta',
          'state': 'GA',
          'zip': '30334',
          'country': 'US'
        },
        'campaign_defaults': {
          'from_name': 'Jane Doe',
          'from_email': 'janedoe@mailchimp.com',
          'subject': 'A Test Campaign',
          'language': 'EN_US'
        }
      })

      list_id = respB.get('id')
      self.assertTrue(type(list_id) == str)
      self.assertTrue(respB.get('name') == list_name)

      # 3. Get specific list
      respC = client.lists.get_list(list_id)
      self.assertTrue(respC.get('name') == list_name)

      # 4. Update specific list
      new_list_name = "TestListPythonB"
      respD = client.lists.update_list(list_id, { 'name': new_list_name })
      self.assertTrue(respD.get('name') == new_list_name)

      # 5. Delete specific list
      respE = client.lists.delete_list(list_id)
      self.assertIsNotNone(respE)

if __name__ == '__main__':
    unittest.main()
