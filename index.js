/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-bootstrap-tagsinput' ,

  included: function(app) {
    this._super.included.apply(this, arguments);
    if (typeof FastBoot === 'undefined') {
    	app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.js');
    }
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.css');
  }
};
