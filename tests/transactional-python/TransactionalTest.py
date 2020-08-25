import time
import os
import sys
import unittest
import importlib
from importlib import util
from dotenv import load_dotenv

# load environment vars
load_dotenv()
TRANSACTIONAL_API_KEY = os.getenv('TRANSACTIONAL_API_KEY')

# load module
sys.path.append("../../swagger-out/transactional-python/mailchimp_transactional/__init__.py")
spec = importlib.util.spec_from_file_location("mailchimp_transactional", "../../swagger-out/transactional-python/mailchimp_transactional/__init__.py")
mailchimp_transactional = importlib.util.module_from_spec(spec)
sys.modules[spec.name] = mailchimp_transactional
spec.loader.exec_module(mailchimp_transactional)

class TestMailchimpTransactional(unittest.TestCase):
    def test_can_read_environment_vars(self):
      self.assertTrue(isinstance(TRANSACTIONAL_API_KEY, str))

    def test_auth_via_init(self):
      client = mailchimp_transactional.Client(TRANSACTIONAL_API_KEY)
      resp = client.users.ping()
      self.assertEqual(resp, "PONG!")

    def test_auth_via_set_api_key(self):
      client = mailchimp_transactional.Client()
      client.set_api_key(TRANSACTIONAL_API_KEY)
      resp = client.users.ping()
      self.assertEqual(resp, "PONG!")

    def test_template_lifecycle(self):
      client = mailchimp_transactional.Client()
      client.set_api_key(TRANSACTIONAL_API_KEY)

      timestamp = str(time.time())
      templateName = "TemplatePython_" + timestamp;
      templateSubjectA = "TemplatePythonSubjectA_" + timestamp;
      templateSubjectB = "TemplatePythonSubjectB_" + timestamp;

      # can list all templates
      respA = client.templates.list()
      self.assertTrue(type(respA) == list)

      # can add a template
      respB = client.templates.add({
        'name': templateName,
        'subject': templateSubjectA
      })
      self.assertTrue(respB.get('name') == templateName)
      self.assertTrue(respB.get('subject') == templateSubjectA)

      # can get template info
      respC = client.templates.info({ 'name': templateName })
      self.assertTrue(respC.get('name') == templateName)
      self.assertTrue(respC.get('subject') == templateSubjectA)

      # can update a template
      respD = client.templates.update({
        'name': templateName,
        'subject': templateSubjectB
      })
      self.assertTrue(respD.get('name') == templateName)
      self.assertTrue(respD.get('subject') == templateSubjectB)

      # can delete a template
      respE = client.templates.delete({ 'name': templateName })
      self.assertTrue(respE.get('name') == templateName)

if __name__ == '__main__':
    unittest.main()
