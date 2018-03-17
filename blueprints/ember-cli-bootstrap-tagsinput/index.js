/* jshint node: true */
import RSVP from "rsvp"

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
  	return RSVP.all([
      this.addBowerPackageToProject('typeahead.js'),
      this.addBowerPackageToProject('bootstrap-tagsinput')
    ]);
  }
};