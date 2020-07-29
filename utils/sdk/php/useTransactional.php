<?php
require_once(__DIR__ . '/vendor/autoload.php');

if (!getenv('GITHUB_ACTION')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

$apiInstance = new MailchimpTransactional\Api\DefaultApi();
$body = new \MailchimpTransactional\Model\Body(array('key' => getenv('TRANSACTIONAL_KEY')));

try {
    $result = $apiInstance->postUsersPing($body);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->postUsersPing: ', $e->getMessage(), PHP_EOL;
}