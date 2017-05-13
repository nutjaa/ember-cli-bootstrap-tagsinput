/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-bootstrap-tagsinput' ,

  included: function(app) {
    this._super.included.apply(this, arguments);
    if (!process.env.EMBER_CLI_FASTBOOT) {
    	app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.js');
    }
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.css');
  }
};
