import Ember from 'ember';

export default Ember.Component.extend({
	tagName: 'input',
	content: null,
	itemText: null,
	itemValue: null,

	addAction:null,
	source:null,

	substringMatcher(strs){
	  return function findMatches(q, cb) {
	    var matches, substrRegex;

	    // an array that will be populated with substring matches
	    matches = [];

	    // regex used to determine if a string contains the substring `q`
	    substrRegex = new RegExp(q, 'i');

	    // iterate through the pool of strings and for any string that
	    // contains the substring `q`, add it to the `matches` array
	    Ember.$.each(strs, function(i, str) {
	      if (substrRegex.test(str)) {
	        matches.push(str);
	      }
	    });

	    cb(matches);
	  };
	},


	setupTagsInput: Ember.on('didRender', function() {
		let elt = this.$() ;
		let me = this ;
		let options = {freeInput : true } ;
		if(this.get('source')){
			options['typeaheadjs'] = {
				source : this.substringMatcher(this.get('source'))
			}
		}


 		elt.tagsinput(options) ;

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

	 	elt.on('itemAdded', function(event) {
		  if(me.get('addAction')){
		  	me.sendAction('addAction', event );
		  }else{
		  	if(! me.get('content').contains(event.item))
		  		me.get('content').pushObject(event.item);
		  }
		});

		elt.on('itemRemoved', function(event) {
		  if(me.get('removeAction')){
		  	me.sendAction('removeAction', event );
		  }else{
		  	me.get('content').removeObject(event.item);
		  }
		});
	}),


	contentChange:Ember.observer('content.[]', function() {
		let added = [] ;
		let removed = [] ;
		let me = this ;
		let elt = this.$() ;
		let tagInput = elt.tagsinput();
		console.log(tagInput);


		if(!tagInput){
			return ;
		}

		let itemsArray = elt.tagsinput()[0].itemsArray ;

		/// Found new data
		this.get('content').forEach(function(itemA){
			let found = false ;
			let str = itemA ;
			if(typeof itemA === 'object' && me.get('itemText')){
				str = itemA.get(me.get('itemText'))
			}
			itemsArray.forEach(function(tag){
				if(str == tag){
					found = true ;
				}
			});

			if(found === false){
				elt.tagsinput('add',str,true);
			}
		});


		/// Found removed data
		itemsArray.forEach(function(tag){
			let found = false ;
			me.get('content').forEach(function(itemA){
				let str = itemA ;
				if(typeof itemA === 'object' && me.get('itemText')){
					str = itemA.get(me.get('itemText'))
				}
				if(str == tag){
					found = true ;
				}
			});

			if(found === false){
				elt.tagsinput('remove',tag);
				elt.tagsinput('refresh');
			}
		});
	}),

	teardownTagsInput: Ember.on('willDestroyElement', function() {
    console.log('Tear Down');
  })
});