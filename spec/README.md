# The spec directory

This directory contains spec files used to generate SDKs and documentation.

## Updating the Marketing Spec

To update the marketing spec, follow these steps.

Check the current version of the spec file:

`cat spec/marketing.json |jq ".info.version"`

Remember this number, it'll be something like `3.0.xx`

Fetch the current spec file from production:

`curl "https://api.mailchimp.com/schema/3.0/Swagger.json?expand" >spec/marketing.json`

Using the editor of your choice, update the version in this file to the old version (that you got above) + 1.

Create a PR.

*Optional* When the PR is created, Github actions will run that create artifacts for each of the new SDKs. Pick an SDK .zip file and download it, then unzip it over an (empty) cloned SDK repo. Diff the unzipped files against HEAD of the SDK repo, but don't create a PR or push it -- this is just a check that the new SDKs will be reasonable and nothing's gone haywire. The changes you see in the SDK should mirror the changes you see in the spec file.

Get approval, then push the PR.

Ideally, update the version of the spec in production. This lives in Swagger.json in the monolith (only Mailchimp engineers can do this piece).

## Updating the Transactional Spec

_tbd_