# Releasing a new version

A new version can be release by invoking `rake release`.

This will release a new version as specified in `VERSION`. The current code base is tagged and the tag is pushed to the GitHub repository.

The new version can be specified as an argument to the Rake task via `rake release[0.1.0]`.
The supplied version number should be picked with full consideration of [semver](http://semver.org/).

If no version argument is specified, the existing version in the `VERSION` file will be parsed and it's patch version number is increased. So if the `VERSION` file contains the string `0.0.1` the new version is `0.0.2`.
