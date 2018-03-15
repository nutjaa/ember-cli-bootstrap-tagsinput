import Controller from "@ember/controller";
import { A } from "@ember/array";
import { inject } from "@ember/service";

export default Controller.extend({

  data1: A(['test1','test2','test3']),
  data2: A(),

  source1: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii',
    'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
    'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire',
    'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
    'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ],

  init(){
    let d1 = this.get('store').createRecord('datam',{name:'test1'});
    let d2 = this.get('store').createRecord('datam',{name:'test2'});
    let d3 = this.get('store').createRecord('datam',{name:'test3'});
    this.get('data2').pushObject(d1);
    this.get('data2').pushObject(d2);
    this.get('data2').pushObject(d3);
  },

  actions:{
    data2_add(event){
      let dx = this.get('store').createRecord('datam',{name:event.item});
      this.get('data2').pushObject(dx);
    },
    data2_remove(event){
      let remvoeItem = null ;
      this.get('data2').forEach(function(item){
        if(item.get('name') === event.item){
          remvoeItem = item ;
        }
      });

      if(remvoeItem){
        this.get('data2').removeObject(remvoeItem);
      }
    },

    data1_add_manual(){
      this.get('data1').pushObject(this.get('data1_input'));
      this.set('data1_input','');
    },

    data1_remove_manual(){
      this.get('data1').removeObject(this.get('data1')[0]);
    }
  }
});