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
