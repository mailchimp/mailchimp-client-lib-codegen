<p align="center">
  <img src="./resources/images/mcdev-banner.png" alt="Mailchimp Developer" width="100%" height="auto">
</p>

# mailchimp-client-lib-codegen

This tool is used to auto-generate and publish both Mailchimp Marketing and Transactional client libraries.

## Quick start

```
git clone git@github.com:mailchimp/mailchimp-client-lib-codegen.git
cd mailchimp
npm install
npm run generate
```

## Generate clients

```
# Install codegen
brew install swagger-codegen@2

# Update $PATH
export JAVA_HOME="/usr/libexec/java_home -v 1.8"
export PATH="$JAVA_HOME:$PATH"
export PATH="/usr/local/opt/swagger-codegen@2/bin:$PATH"

# See package.json for all available generate commands
npm run generate
```

# Published clients — Internal

| Marketing |                                                                                       |
| --------- | ------------------------------------------------------------------------------------- |
| Node.js   | [mailchimp-marketing-node](https://github.com/mailchimp/mailchimp-marketing-node)     |
| PHP       | [mailchimp-marketing-php](https://github.com/mailchimp/mailchimp-marketing-php)       |
| Ruby      | [mailchimp-marketing-ruby](https://github.com/mailchimp/mailchimp-marketing-ruby)     |
| Python    | [mailchimp-marketing-python](https://github.com/mailchimp/mailchimp-marketing-python) |

| Transactional |                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------- |
| Node.js       | [mailchimp-transactional-node](https://github.com/mailchimp/mailchimp-transactional-node)     |
| PHP           | [mailchimp-transactional-php](https://github.com/mailchimp/mailchimp-transactional-php)       |
| Ruby          | [mailchimp-transactional-ruby](https://github.com/mailchimp/mailchimp-transactional-ruby)     |
| Python        | [mailchimp-transactional-python](https://github.com/mailchimp/mailchimp-transactional-python) |

# Published clients — External

| Marketing      |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| Node           | [NPM](https://www.npmjs.com/package/@mailchimp/mailchimp_marketing) |
| PHP            | [Packagist](https://packagist.org/packages/mailchimp/marketing)     |
| Ruby           | [RubyGems](https://rubygems.org/gems/MailchimpMarketing)            |
| Python (Dist)  | [PyPI](https://pypi.org/project/mailchimp-marketing/)               |
| Python (Test)) | [PyPI](https://test.pypi.org/project/mailchimp-marketing/)          |

| Transactional |                                                                         |
| ------------- | ----------------------------------------------------------------------- |
| Node          | [NPM](https://www.npmjs.com/package/@mailchimp/mailchimp_transactional) |
| PHP           | [Packagist](https://packagist.org/packages/mailchimp/transactional)     |
| Ruby          | [RubyGems](https://rubygems.org/gems/MailchimpTransactional)            |
| Python (Dist) | [PyPI](https://pypi.org/project/mailchimp-transactional/)               |
| Python (Test) | [PyPI](https://test.pypi.org/project/mailchimp-transactional/)          |
