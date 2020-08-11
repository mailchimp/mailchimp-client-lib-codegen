<?php

require_once '../../swagger-out/transactional-php/MailchimpTransactional/vendor/autoload.php';

class TransactionalTest extends \PHPUnit\Framework\TestCase
{
    public function testBasicAuth()
    {
        $client = new MailchimpTransactional\ApiClient();
        $client->setApiKey(getenv('TRANSACTIONAL_API_KEY'));

        $resp = $client->users->ping();
        $this->assertEquals("PONG!", $resp);
    }
}
