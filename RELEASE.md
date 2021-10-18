# Celo.org Releases

## Versioning

n/a

## Identifying releases

Identify by pull request number

## Build & Promotion process

The website is hosted on [Google App Engine](https://cloud.google.com/appengine/).

## development
when in development you can deploy to dev env with

`yarn deploy:dev`

In order to deploy it, you first need the [gcloud SDK](https://cloud.google.com/sdk/gcloud/).

`brew cask install google-cloud-sdk`


You may need to log in and be granted additional permissions.

`gcloud auth login`

 Make sure your dependencies are up to date. From the root of project, run

`yarn`

> Deploying will upload files on local machine to gcloud, make sure you are on the intended branch and it is up to date

Now from web package directory deploy to dev.celo.org with:

`yarn run deploy:dev`

### staging

Pull Requests get deployed automatically via cloud build to pr-{_PULL_REQUEST_NUMBER}-dot-staging-dot-celo-org-website.uc.r.appspot.com/


### production and preview

whenever the master branch is updated cloud build will automatically deploy a build to

* preview env (this is used to preview content from contentful)
* production env. however it will NOT promote this version to be live on celo.org


## Promotion

Before Promoting a version please manually do a sanity check to ensure website doesn't have have any unexpected weirdness.

`yarn promote:prod VERSION` eg `yarn promote:prod pr-389`


or go to https://console.cloud.google.com/appengine/versions?project=celo-org-website&serviceId=production and migrate traffic to intended version

## Dependencies

@celo/utils

## Dependents

n/a
