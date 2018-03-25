var StylusCompiler = require('broccoli-stylus-single');
var path = require('path');
var VersionChecker = require('ember-cli-version-checker');
var mergeTrees = require('broccoli-merge-trees');

function StylusPlugin(optionsFn) {
  this.name = 'ember-cli-stylus';
  this.ext = 'styl';
  this.optionsFn = optionsFn;
};

StylusPlugin.prototype.toTree = function(tree, inputPath, outputPath, inputOptions) {
  var trees = [tree];
  var options = Object.assign({}, this.optionsFn(), inputOptions);

  if (options.includePaths) {
    trees = trees.concat(options.includePaths);
  }

  var paths = options.outputPaths;
  var trees = Object.keys(paths).map(function(file) {
    var input = path.join(inputPath, file + '.styl');
    var output = paths[file];
    return new StylusCompiler(trees, input, output, options);
  });

  return mergeTrees(trees);
};

module.exports = {
  name: 'Ember CLI Stylus',

  stylusOptions: function() {
    var options = (this.app && this.app.options && this.app.options.stylusOptions) || {};

    if (options.sourceMap) {
      options.sourceComments = 'map';
      options.sourceMap = options.outputFile + '.map';
    }

    if ((options.sourceMap === undefined) && (this.app.env == 'development')) {
      options.sourcemap = {
        inline: true
      };
      options.cache = false;
    }

    options.inputFile = options.inputFile || 'app.styl';
    options.outputFile = options.outputFile || this.project.name() + '.css';
    return options;
  },

  shouldSetupRegistryInIncluded: function() {
    var checker = new VersionChecker(this);
    var emberVersion = checker.forEmber();

    return !emberVersion.gt('0.2.0');
  },

  setupPreprocessorRegistry: function(type, registry) {
    registry.add('css', new StylusPlugin(this.stylusOptions.bind(this)));
  },

  included: function(app) {
    this._super.included.apply(this, arguments);
    this.app = app;

    if (this.shouldSetupRegistryInIncluded()) {
      this.setupPreprocessorRegistry('parent', app.registry);
    };
  }
};
