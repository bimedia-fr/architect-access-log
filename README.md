architect-access-log
=================

Provide access log to an architect application using a `rest` plugin. 

### Installation

```sh
npm install --save architect-access-log
```

### Usage

Boot [Architect](https://github.com/c9/architect) :

```js
var path = require('path');
var architect = require("architect");

var config = architect.loadConfig(path.join(__dirname, "config.js"));

architect.createApp(config, function (err, app) {
    if (err) {
        throw err;
    }
    console.log("app ready");
});
```

Configure logging with Architect `config.js` :

```js
module.exports = [{
    packagePath: "architect-access-log",
    fmt: 'url=":url" method=":method" statusCode=":statusCode" delta=":delta" ip=":ip"'
}, './services'];
```