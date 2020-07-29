<?php
require_once(__DIR__ . '/vendor/autoload.php');

if (!getenv('GITHUB_ACTION')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
    $dotenv->load();
}

// Configure HTTP basic authorization: basicAuth
$config = MailchimpMarketing\Configuration::getDefaultConfiguration()
    ->setUsername(getenv('MARKETING_USER'))
    ->setPassword(getenv('MARKETING_PASS'));

$apiInstance = new MailchimpMarketing\Api\DefaultApi(
    null,
    $config
);

try {
    $result = $apiInstance->getPing();
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling DefaultApi->getPing: ', $e->getMessage(), PHP_EOL;
}