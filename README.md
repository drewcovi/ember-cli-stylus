# ember-cli-stylus

Use node-stylus to preprocess your ember-cli app's files, with support for sourceMaps and include paths.

This is essentially a fork-search-replace job of [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). Credits go to [@aexmachina](https://github.com/aexmachina).

## Installation

```
npm install --save-dev ember-cli-stylus
```

## Usage

By default this addon will compile `app/styles/app.styl` into `dist/assets/app.css` and produce a sourceMap for your delectation.

Or, if you want more control then you can specify options using the `stylusOptions` config property:

```javascript
var app = new EmberApp({
  ...
  stylusOptions: {...}
});
```

- `.inputFile`: the input Stylus file, defaults to `app.styl`
- `.outputFile`: the output CSS file, defaults to `app.css`
- `.includePaths`: an array of include paths
- `.sourceMap`: controls sourcemap options, defaults to `include: true` in development. The sourceMap file will be saved to `options.outputFile + '.map'`

## Example

The following example assumes your bower packages are installed into `bower_components/`.

Install some Stylus:

```shell
bower install --save foundation
```

Specify some include paths in Brocfile.js:

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
