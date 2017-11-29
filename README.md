# ember-cli-stylus

Use node-stylus to preprocess your ember-cli app's files, with support for sourceMaps and include paths.

This is essentially a fork-search-replace job of [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). Credits go to [@aexmachina](https://github.com/aexmachina).

## Installation

```
npm install --save-dev ember-cli-stylus
```

## Usage

By default this addon will compile `app/styles/app.styl` into `dist/assets/app.css` and produce a sourceMap for your delectation.

Or, if you want more control then you can specify options using the `stylusOptions` config property in `ember-cli-build.js`

```javascript
var app = new EmberApp({
  ...
  stylusOptions: {...}
});
```

- `.includePaths`: an array of include paths
- `.sourceMap`: controls sourcemap options, defaults to `inline: true` in development. The sourceMap file will be saved to `options.outputFile + '.map'`
- `.use`: array with stylus plugins, check [stylus API](http://learnboost.github.io/stylus/docs/js.html#usefn)

### Processing multiple files

If you need to process multiple files, it can be done by [configuring the output paths](http://ember-cli.com/user-guide/#configuring-output-paths) in your `ember-cli-build.js`:

```js
var app = new EmberApp({
  outputPaths: {
    app: {
      css: {
        'app': '/assets/application-name.css',
        'themes/alpha': '/assets/themes/alpha.css'
      }
    }
  }
});
```

## Example

The following example assumes your bower packages are installed into `bower_components/`.

Install some Stylus:

```shell
bower install --save foundation
```

Specify some include paths in `ember-cli-build.js`:

```javascript
var app = new EmberApp({
  stylusOptions: {
    includePaths: [
      'bower_components/foundation/styl'
    ]
  }
});
```

Import some deps into your app.styl:

```styl
@import 'foundation'; /* import everything */
/* or just import the bits you need: @import 'foundation/functions'; */
```
