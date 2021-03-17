<?php

require_once '../../swagger-out/marketing-php/MailchimpMarketing/vendor/autoload.php';

class MarketingTest extends \PHPUnit\Framework\TestCase
{
    public function testBasicAuth()
    {
        $client = new MailchimpMarketing\ApiClient();
        $client->setConfig([
            'apiKey' => getenv('MARKETING_API_KEY'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        $resp = $client->ping->get();
        $this->assertEquals("Everything's Chimpy!", $resp->health_status);
    }

    public function testIncludeExclude()
    {
        $client = new MailchimpMarketing\ApiClient();
        $client->setConfig([
            'apiKey' => getenv('MARKETING_API_KEY'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        # include fields
        $resp = $client->root->getRoot(["account_id"]);
        $this->assertObjectHasAttribute("account_id", $resp);
        $this->assertObjectNotHasAttribute("login_id", $resp);

        $resp = $client->root->getRoot(["account_id", "login_id"]);
        $this->assertObjectHasAttribute("account_id", $resp);
        $this->assertObjectHasAttribute("login_id", $resp);

        $resp = $client->root->getRoot(null, ["account_id"]);
        $this->assertObjectNotHasAttribute("account_id", $resp);
        $this->assertObjectHasAttribute("login_id", $resp);

        $resp = $client->root->getRoot(null, ["account_id", "login_id"]);
        $this->assertObjectNotHasAttribute("login_id", $resp);
        $this->assertObjectNotHasAttribute("account_id", $resp);
    }

    public function testOAuth()
    {
        $client = new MailchimpMarketing\ApiClient();
        $client->setConfig([
            'accessToken' => getenv('MARKETING_ACCESS_TOKEN'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        $resp = $client->ping->get();
        $this->assertEquals("Everything's Chimpy!", $resp->health_status);
    }

    public function testListAudiences()
    {
        $client = new MailchimpMarketing\ApiClient();
        $client->setConfig([
            'accessToken' => getenv('MARKETING_ACCESS_TOKEN'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        $resp = $client->lists->getAllLists();
        $this->assertTrue(is_array($resp->lists));
    }

    public function testAudienceLifecycle()
    {
        $client = new MailchimpMarketing\ApiClient();
        $client->setConfig([
            'apiKey' => getenv('MARKETING_API_KEY'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        // 1. Get all lists
        $respA = $client->lists->getAllLists();
        $this->assertTrue(is_array($respA->lists));

        // 2. Create new list
        $listName = "TestListPhpA" . time();
        $respB = $client->lists->createList([
            'name' => $listName,
            'permission_reminder' => 'permission_reminder',
            'email_type_option' => true,
            'contact' => [
                'company' => 'Acme Company',
                'address1' => '206 Washington St SW',
                'city' => 'Atlanta',
                'state' => 'GA',
                'zip' => '30334',
                'country' => 'US'
            ],
            'campaign_defaults' => [
                'from_name' => 'Jane Doe',
                'from_email' => 'janedoe@mailchimp.com',
                'subject' => 'A Test Campaign',
                'language' => 'EN_US'
            ]
        ]);
        $listId = $respB->id;
        $this->assertTrue(is_string($listId));
        $this->assertTrue($respB->name === $listName);

        // 3. Get specific list
        $respC = $client->lists->getList($listId);
        $this->assertTrue($respC->name === $listName);

        // 4. Update specific list
        $newListName = "TestListPhpB" . time();
        $respD = $client->lists->updateList($listId, [ 'name' => $newListName ]);
        $this->assertTrue($respD->name === $newListName);

        // // 5. Delete specific list
        $respE = $client->lists->deleteList($listId);
        $this->assertNull($respE);
    }
}
