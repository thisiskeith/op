# oboe-p

oboe-p is a simple Oboe.js XHR wrapper with ES6 promises optimized for use with your Node.js and React apps.

## Examples

Node.js

```js
exports.getExample = function (req, res) {

    var xhrData = {
        url: 'http://example.com/'
    };

    op(xhrData)
        .then((payload) => res.send(payload))
        .catch((error) => res.status(500).send(error));
};
```

## Installation

Install the package
```js
npm install oboe-p --save
```
Import into your application
```js
import op from 'oboe-p';
```

