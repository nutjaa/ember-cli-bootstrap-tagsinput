/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-cli-bootstrap-tagsinput' ,

  included: function(app) {
    this._super.included.apply(this, arguments);

    app.import(app.bowerDirectory + '/typeahead.js/dist/typeahead.bundle.js');

    app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.js');
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput.css');
    app.import(app.bowerDirectory + '/bootstrap-tagsinput/src/bootstrap-tagsinput-typeahead.css');
  }
};
