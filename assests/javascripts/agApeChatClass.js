// $Id$ 

/**
 * agApeChatClass
 *
 */

 APE.agApeChat = new Class({
	
	Extends: APE.Client,
	
	Implements: Options,
	
	options: {
		container: document.body,
    logs_limit: 10, 
    name: null,
    usernameContainer: null,
	},
	
	initialize: function(options){
		this.setOptions(options);
		this.container = $(this.options.container) || document.body;
    
    this.currentPipe = null;
    this.logging = true;
    
          
		this.addEvent('load',this.start);  
    
    this.onRaw('postmsg', this.onMsg);
	},
	
	start: function(core){  
    var userProfile = {'sendStack': false, 'request': 'stack'};
	  this.name = $(this.options.usernameContainer).get('html');
    this.core.start({'name': this.name});
	},
  
	
	onMsg: function(raw){
		new Element('div', {
			'class': 'message',
			html: decodeURIComponent(raw.data.message)
		}).inject(this.container);
	}
	
});
