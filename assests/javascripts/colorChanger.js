/**
 * @author Paul Price
 * Who needs MooTools' Class() method?
 */

function colorChanger(ape, debug){
	this.initialize = function(){
		// do the following every time we get a new user
		ape.addEvent('pipeCreate', this.setup);
		
		// when a user joins, update the user list
		ape.addEvent('userJoin', this.createUser);

		// when a user leaves, destroy them with mighty thunder!
		ape.addEvent('userLeft', this.deleteUser);
		
		// when we want to send data
		ape.onCmd('send', this.cmdSend);
		
		// and when we recieve data
		ape.onRaw('data', this.rawData);
    $("#debug").append('in'); 
		// start the session with a random name!
		ape.start({"name":String((new Date()).getTime()).replace(/\D/gi,'')});
     $("#debug").append('out');
	}
	
	this.setup = function(type, pipe, options){
		// add an event listener on our selectbox
		$("select[name=selectColor]").change(function(){
			// get the select box value
			color = $("option:selected", this).val();
			
			// set the background of the document to the color chosen
			$("body").css("background-color", color);
			
			// send the new color to the APE server
			pipe.send(color);
		});
	}
	
	this.cmdSend = function(pipe, sessid, pubid, message){
		if(debug)
			$("<span>&nbsp;&nbsp;&nbsp;&nbsp;" + ape.user.properties.name + " changed the bg color to " + message + "</span><br />").prependTo("#debug");
	}
	
	this.rawData = function(raw, pipe){
		if(debug)
			$("<span>&nbsp;&nbsp;&nbsp;&nbsp;" + raw.datas.sender.properties.name + " changed the bg color to " + raw.datas.msg + "</span><br />").prependTo("#debug");
		
		// set the selectboxes value to match
		$("select[name=selectColor]").val(raw.datas.msg);
		
		// set the color
		$("body").css("background-color", raw.datas.msg);
	}
	
	this.createUser = function(user, pipe){
		user.element = $("<span>" + user.properties.name + " has joined bgColor</span><br />").prepend("<img src='bullet_green.png' />").prependTo("#debug");
	}
	
	this.deleteUser = function(user, pipe){
		$(user.element).text(user.properties.name + " has left bgColor").css("color", "#666666").prepend("<img src='bullet_red.png' />");
	}
}
