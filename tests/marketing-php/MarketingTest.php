<?php

require_once '../../swagger-out/marketing-php/MailchimpMarketing/vendor/autoload.php';

class MarketingTest extends \PHPUnit\Framework\TestCase
{
    public function testBasicAuth()
    {
        $clientA = new MailchimpMarketing\ApiClient();
        $clientA->setConfig([
            'apiKey' => getenv('MARKETING_API_KEY'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        $resp = $clientA->ping->get();
        $this->assertEquals("Everything's Chimpy!", $resp->health_status);
    }

    public function testOAuth()
    {
        $clientB = new MailchimpMarketing\ApiClient();
        $clientB->setConfig([
            'accessToken' => getenv('MARKETING_ACCESS_TOKEN'),
            'server' => getenv('MARKETING_SERVER'),
        ]);

        $resp = $clientB->ping->get();
        $this->assertEquals("Everything's Chimpy!", $resp->health_status);
    }
}
