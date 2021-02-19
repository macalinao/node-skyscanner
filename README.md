# node-skyscanner

Skyscanner's public API for Node.js.

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-url]][daviddm-image]

## Install

```sh
$ npm install skyscanner
```

## Usage

```js
var Skyscanner = require("skyscanner");
var s = new Skyscanner();

s.destinations("US", "US");
s.calendar("DFWA", "LHR");
s.autosuggest("dallas fort worth");
```

See the tests for more info.

## Testing

Run tests with `grunt`.

## License

MIT © [Ian Macalinao](http://ian.pw)

[npm-url]: https://npmjs.org/package/skyscanner
[npm-image]: https://badge.fury.io/js/skyscanner.svg
[travis-url]: https://travis-ci.org/simplyianm/node-skyscanner
[travis-image]: https://travis-ci.org/simplyianm/node-skyscanner.svg?branch=master
[daviddm-url]: https://david-dm.org/simplyianm/node-skyscanner.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/simplyianm/node-skyscanner
