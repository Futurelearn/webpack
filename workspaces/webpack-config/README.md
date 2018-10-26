# Developing

In order to develop this package locally within the FL application you need to

* run `yarn link` from this directory
* run `yarn link futurelearn-webpack` from the root of the futurelearn app
* profit

When you are done developing and are ready to ship your changes

* Bump the package number in package.json in this directory
* run `yarn unlink`
* run `yarn unlink futurelearn-webpack` from the root of the futurelearn app
* run `yarn upgrade file:./webpack`
* profit
