/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var mergeTrees = require('broccoli-merge-trees');
var map = require('broccoli-stew').map;
var fs = require('fs');
var path = require('path');

module.exports = {
  name: 'ember-cli-bootstrap-tagsinput' ,

  included: function(app) {
    this._super.included.apply(this, arguments);

    // see: https://github.com/ember-cli/ember-cli/issues/3718
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    var vendor = this.treePaths.vendor;

    app.import(vendor + '/bootstrap-tagsinput/src/bootstrap-tagsinput.js');
    app.import(vendor + '/bootstrap-tagsinput/src/bootstrap-tagsinput.css');
  },

  treeForVendor: function(vendorTree) {
    var trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    var p = path.join(
      path.dirname(require.resolve('ember-cli-bootstrap-tagsinput')),
      '../../bower_components/'
      );

    console.log(p);

    var bootstrapTagInput =  new Funnel(p, {
      destDir: 'bootstrap-tagsinput',
      include: ['src/*.js']
    });

    bootstrapTagInput = map(bootstrapTagInput,
        (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);

    trees.push(bootstrapTagInput);

    //console.log(trees);


    return mergeTrees(trees);
  }
};
