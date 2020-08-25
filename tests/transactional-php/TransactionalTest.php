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

    public function testTemplateLifecycle()
    {
        $client = new MailchimpTransactional\ApiClient();
        $client->setApiKey(getenv('TRANSACTIONAL_API_KEY'));

        $timestamp = time();
        $templateName = "TemplatePhp_" . $timestamp;
        $templateSubjectA = "TemplatePhpSubjectA_" . $timestamp;
        $templateSubjectB = "TemplatePhpSubjectB_" . $timestamp;

        # can list all templates
        $respA = $client->templates->list();
        $this->assertTrue(is_array($respA));

        # can add a template
        $respB = $client->templates->add([
            "name" => $templateName,
            "subject" => $templateSubjectA
        ]);
        $this->assertTrue($respB->name === $templateName);
        $this->assertTrue($respB->subject === $templateSubjectA);

        # can get template info
        $respC = $client->templates->info([ "name" => $templateName ]);
        $this->assertTrue($respB->name === $templateName);
        $this->assertTrue($respB->subject === $templateSubjectA);

        # can update a template
        $respD = $client->templates->update([
            "name" => $templateName,
            "subject" => $templateSubjectB
        ]);
        $this->assertTrue($respD->name === $templateName);
        $this->assertTrue($respD->subject === $templateSubjectB);

        # can delete a template
        $respE = $client->templates->delete([ "name" => $templateName ]);
        $this->assertTrue($respE->name === $templateName);
    }
}
