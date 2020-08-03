<p align="center">
    <img src="./resources/images/readme_cover.png" alt="Mailchimp Freddie" width="100%" height="auto">
    <img src="https://github.com/mailchimp/mailchimp-client-lib-codegen/workflows/Validate%20Specs/badge.svg" alt="Validate Specs Status" width="auto" height="20">
</p>

This tool is used to auto-generate and publish both Mailchimp Marketing and Transactional client libraries.

## Table of contents

- [Supported Languages](#supported-languages)
- [Requirements](#requirements)
- [Quick start](#quick-start)
- [How it works](#how-it-works)
- [Publishing](#publishing)
- [Local installation](#local-installation)
  - [Node](#node)
  - [PHP](#php)
  - [Ruby](#ruby)
  - [Python](#python)
- [Published SDKs — Internal](#published-clients-internal)
- [Published SDKs — External](#published-clients-internal)

## Supported Languages

<div>
  <img src="./resources/images/lang_node.png" width="88" height="88">
  <img src="./resources/images/lang_typescript.png" width="88" height="88">
  <img src="./resources/images/lang_php.png" width="88" height="88">
  <img src="./resources/images/lang_ruby.png" width="88" height="88">
  <img src="./resources/images/lang_python.png" width="88" height="88">
</div>

## Requirements

- [Node.js](https://nodejs.org/en/) 10 or later

## Quick start

```
git clone git@github.com:mailchimp/mailchimp-client-lib-codegen.git
cd mailchimp
npm install
npm run generate
```

## How it works

The publishing workflow is triggered by pushing changes to either the Mailchimp Marketing or Transactional OAS 2.0 spec file. This kicks off a validation event in GitHub Actions, followed by a workflow to build and publish each client library to its respective public package manager(s).

## Publishing

GitHub Actions is used to streamline the client publication process.

| Language   | Published To |
| ---------- | ------------ |
| Javascript | NPM          |
| PHP        | Packagist    |
| Ruby       | RubyGems     |
| Python     | PyPI         |

## Local installation

```
# Install codegen
brew install swagger-codegen@2

# Update $PATH
export JAVA_HOME="/usr/libexec/java_home -v 1.8"
export PATH="$JAVA_HOME:$PATH"
export PATH="/usr/local/opt/swagger-codegen@2/bin:$PATH"

# See package.json for all available generate commands
npm run validate
npm run generate
```

#### Node

```
# in sdk project root
npm install
npm link

# verify local package is available
npm ls --global <SDK_PROJECT_NAME>

# in test project root
npm link <PATH_TO_SDK>
npm install <PATH_TO_SDK>

# You should now be able to use the local package just like a normal NPM package
require 'MailchimpMarketing'
```

#### Ruby

```
# install ruby
brew install ruby

# build the gem, a new *.gem file is created w/ the version number
gem build MailchimpMarketing.gemspec

# install it locally (may need sudo)
gem install ./MailchimpMarketing-1.0.0.gem

# add dependency to the Gemfile:
gem 'MailchimpMarketing', '~> 1.0.0'

# you should now be able to use the gem
require 'MailchimpMarketing'

```

#### Python

```
# Install python3
brew install python3

# Update $PATH
export PATH="/usr/local/opt/python3/libexec/bin:$PATH"

# Verify brew version is running
python3 --version

# In SDK project folder, install the package locally via setuptools:
python3 setup.py install --user

# You should now be able to import and use the local python SDK
import mailchimp_marketing
```

# Published Clients — Internal

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

# Published Clients — External

| Marketing      |                                                                     |
| -------------- | ------------------------------------------------------------------- |
| Node           | [NPM](https://www.npmjs.com/package/@mailchimp/mailchimp_marketing) |
| Ruby           | [RubyGems](https://rubygems.org/gems/MailchimpMarketing)            |
| Python (Dist)  | [PyPI](https://pypi.org/project/mailchimp-marketing/)               |
| Python (Test)) | [PyPI](https://test.pypi.org/project/mailchimp-marketing/)          |

| Transactional |                                                                         |
| ------------- | ----------------------------------------------------------------------- |
| Node          | [NPM](https://www.npmjs.com/package/@mailchimp/mailchimp_transactional) |
| Ruby          | [RubyGems](https://rubygems.org/gems/MailchimpTransactional)            |
| Python (Dist) | [PyPI](https://pypi.org/project/mailchimp-transactional/)               |
| Python (Test) | [PyPI](https://test.pypi.org/project/mailchimp-transactional/)          |
