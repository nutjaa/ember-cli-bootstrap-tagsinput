import Component from "@ember/component";
import { observer } from "@ember/object";
import { on } from "@ember/object/evented";
import $ from "jquery";

export default Component.extend({
  tagName: 'input',
  attributeBindings: ['placeholder', 'disabled'],
  content: null,
  itemText: null,
  itemValue: null,

  addAction: null,
  source: null,

  tagClass: '',

  substringMatcher(strs){
    return function findMatches(q, cb) {
      var matches, substrRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);
    };
  },


  setupTagsInput: on('didRender', function() {
    let elt = this.$();
    let me = this;
    let options = {freeInput : true };
    if(this.get('source')){
      options['typeaheadjs'] = {
        source: this.substringMatcher(this.get('source'))
      }
    }

    if(this.get('tagClass')){
      options['tagClass'] = this.get('tagClass');
    }

    elt.tagsinput(options);

    if(this.get('content') !== null){
      this.get('content').forEach(function(item){
        if(me.get('itemText') === null){
          if(typeof item !== 'object'){
            elt.tagsinput('add',item);
          }
        }else if(me.get('itemText') !== null){
          elt.tagsinput('add',item.get(me.get('itemText')));
        }
      });
    }

    elt.on('beforeItemAdd',function(event){
      if(me.get('beforeAddAction')){
        me.sendAction('beforeAddAction', event, me.get('content'));
      }
    });

    elt.on('itemAdded', function(event){
      if(me.get('addAction')){
        me.sendAction('addAction', event, me.get('content') );
      }else{
        if(! me.get('content').includes(event.item))
          me.get('content').pushObject(event.item);
      }
    });

    elt.on('itemRemoved', function(event) {
      if(me.get('removeAction')){
        me.sendAction('removeAction', event, me.get('content'));
      }else{
        me.get('content').removeObject(event.item);
      }
    });

    const text_input = this.$().parent().children('.bootstrap-tagsinput').find('input')
    text_input
      .attr('size',1)
      .keyup(() => {
        text_input.attr('size', text_input.val().length)
      })

  }),


  contentChange: observer('content.[]', function() {
    let me = this;
    let elt = this.$();
    let tagInput = elt.tagsinput();

    if(!tagInput){
      return ;
    }

    let itemsArray = elt.tagsinput()[0].itemsArray ;

    /// Found new data
    this.get('content').forEach(function(itemA){
      let found = false;
      let str = itemA;
      if(typeof itemA === 'object' && me.get('itemText')){
        str = itemA.get(me.get('itemText'))
      }
      itemsArray.forEach(function(tag){
        if(str == tag){
          found = true;
        }
      });

      if(found === false){
        elt.tagsinput('add',str,true);
      }
    });


    /// Found removed data
    itemsArray.forEach(function(tag){
      let found = false;
      me.get('content').forEach(function(itemA){
        let str = itemA;
        if(typeof itemA === 'object' && me.get('itemText')){
          str = itemA.get(me.get('itemText'));
        }
        if(str == tag){
          found = true;
        }
      });

      if(found === false){
        elt.tagsinput('remove',tag);
        elt.tagsinput('refresh');
      }
    });
  }),

  teardownTagsInput: on('willDestroyElement', function() {
    this.$().tagsinput('destroy');
  })
});