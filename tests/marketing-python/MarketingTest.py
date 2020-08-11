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

if __name__ == '__main__':
    unittest.main()
