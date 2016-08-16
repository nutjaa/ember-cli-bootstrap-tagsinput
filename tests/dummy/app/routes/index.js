import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Route.extend({
  setupController: function(controller, model) {
    controller.setupData() ;
    this._super(controller, model);

  }
});