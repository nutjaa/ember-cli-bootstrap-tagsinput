/* jshint node: true */
'use strict';


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
    var Funnel = require('broccoli-funnel');
    var map = require('broccoli-stew').map;
    var mergeTrees = require('broccoli-merge-trees');

    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    trees.push(
      new Funnel('bower_components/bootstrap-tagsinput', {
        destDir: '/bootstrap-tagsinput'
      })
    );

    return map(mergeTrees(trees), (content, relativePath) => {
      if (relativePath.match(/\.js$/i)) {
        return `if (typeof FastBoot === 'undefined') { ${content} }`;
      }
      return content;
    });
  }
};
