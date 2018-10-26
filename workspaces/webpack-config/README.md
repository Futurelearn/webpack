# @futurelearn/webpack

### What is this

This is the webpack configuration for the main FutureLearn application.

### Developing

The easiest way to use this within the FutureLearn app while developing is by
using `yarn link`.

To do this:

* Run `yarn link` within this directory
* cd into the main FutureLearn app and run `yarn link @futurelearn/webpack`
* You will now be using a symlinked version of the package within the FL
    Application

Once you are done making changes

* Run `npm version <update_type>` where update_type is one of patch, minor or
    major. This will bump the version in `package.json` dependant on the update
    type chosen
* Unlink @futurelearn/webpack by running `yarn unlink @futurelearn/webpack` in
    the main FL app.
* Commit the changes and push to master

### Publishing

* Run `npm publish`
* Check that https://npmjs.com/package/@futurelearn/webpack/ is pointing at the
    latest version
* Update the main FutureLearn app to use the newer version by using `yarn
    upgrade @futurelearn/webpack`

Note you will need to have an npm account and be a member of the FutureLearn organisation on npm to
publish. You can ask in #tech to be invited.
