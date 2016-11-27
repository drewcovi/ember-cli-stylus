var StylusCompiler = require('broccoli-stylus-single');
var checker = require('ember-cli-version-checker');

function StylusPlugin(optionsFn) {
  this.name = 'ember-cli-stylus';
  this.ext = 'styl';
  this.optionsFn = optionsFn;
};

StylusPlugin.prototype.toTree = function(tree, inputPath, outputPath) {
  var trees = [tree];
  var options = this.optionsFn();
  if (options.includePaths) trees = trees.concat(options.includePaths);
  inputPath += '/' + options.inputFile;
  outputPath += '/' + options.outputFile;
  return new StylusCompiler(trees, inputPath, outputPath, options);
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
    return !checker.isAbove(this, '0.2.0');
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
