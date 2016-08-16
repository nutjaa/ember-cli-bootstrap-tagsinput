/* jshint node: true */

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
  	this.addBowerPackageToProject('typeahead.js');
  	return this.addBowerPackageToProject('bootstrap-tagsinput');
  }
};