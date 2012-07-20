# Releasing a new version

Two steps are required to release a new version :

* Tag it
* Upload it

## Tagging

We tag versions with "vx.x.x".

    git tag v1.0.0
    git push --tags

Pick the version number with full consideration of [semver](http://semver.org/)

## Uploading

There is a rake task for uploading a version.

    rake upload_latest

This will build the latest version and upload it to github.
