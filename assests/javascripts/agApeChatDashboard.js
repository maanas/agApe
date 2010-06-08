// $Id$ 

/**
 * agApeChat
 *
 */

//Use APE JSF build with session
  //APE.Config.scripts = [APE.Config.baseUrl + '/Build/uncompressed/apeCoreSession.js'];

  // create our new shiney APE client  
  var client = new APE.Client;  
  
  // initalise winid
  var winid = 0;
  
  // initalise winPipeMap 
  var winPipeMap = 	{
  				0:0,
  				1:1,
  				2:2,
  				3:3,
  				4:4,
  				5:5,
  				6:6,
  				7:7,
  				8:8,
  				9:9,
  				10:10
  				}
  
    
  // set to false to disable debugging  
  var debug = true;

  $(document).ready(function(){
    // load the APE client  
    client.load({identifier: 'agOfficeDb'}); 

    //Intercept 'load' event. This event is fired when the Core is loaded and ready to connect to APE Server
    client.addEvent('load', function() {
        
      var aun = $('#apeUsername').html();
      //var aun = String((new Date()).getTime()).replace(/\D/gi,'');

	  var opt = {'sendStack': false, 'request': 'stack'};
      //Call the core start function to connect to APE Server
      
      if (!client.core.options.restore) {
       client.core.start({"name":aun, "role":"agent"});
      }
      else {
        client.core.start();
      }

    });

    
    client.addEvent('ready', function() {
      
      if(debug)
        $("#debug").append("<span><strong> Client is connected to Ape Server</strong></span><br />");
       
      // join 'agOffice'
      client.core.join('agOffice');
        
      
          
     
     // do the following every time a new channel pipe is created 
     client.addEvent('multiPipeCreate', function(pipe, options){
       	if(pipe.name = "agOffice"){
          winid=0;
        }
        else {
          winid++;
        }
        
        
      	if(debug)
        	$("#debug").append("<span><strong>User connected to " + pipe.name + "</strong></span><br />");

      	var pubid = pipe.getPubid();
      	winPipeMap[winid]=pubid;      
      	client.core.setSession({'myWinPipe':winPipeMap});
      });


      // when a user joins, update the user list
      client.addEvent('userJoin', function(user, pipe){
          user.element = $("<span>" + user.properties.name + " has joined agOffice</span><br />").prepend("<img src='bullet_green.png' />").prependTo("#debug");
        });


      // when a user leaves, destroy them with mighty thunder!
      client.addEvent('userLeft', function(user, pipe){
          $(user.element).text(user.properties.name + " has left agOffice").css("color", "#666666").prepend("<img src='bullet_red.png' />");
        });


      // when we want to send data
      client.onCmd('send', function(data, pipe){
          if(debug)
            $("<span>&nbsp;&nbsp;&nbsp;&nbsp;" + client.core.user.properties.name + " changed the bg color to " + data.msg + "</span><br />").prependTo("#debug");
        });
        


      // when we recieve data
      client.onRaw('data', function(raw, pipe){
        //console.log(raw.data.from);  
        if(debug)
            $("<span>" + raw.data.from.properties.name + " sends " + raw.data.msg  + "</span><br />").prependTo("#debug");
            
        });
        
 		
 		
 		// when support is pressed
    	$(".support").click(function() {
      		var id = $(this).parent().attr('id');
      		var username = $(this).attr('username');
      		var session = $(this).attr('session');
      		var pubid = $(this).attr('pubid');
			// send command
      		currentPipe = client.core.getPipe(winPipeMap[0]);
      		currentPipe.request.send('SEND_SUPPORT',{'username':username, 'id':id, 'agent':client.core.user.properties.name}, {'from':client.core.user});
    	});
 

      // when we recieve support
      client.onRaw('SUPPORT_DATA', function(raw, pipe){
        console.log(raw);
        console.log(pipe);
        //$("span #"+raw.data.id).empty().html(raw.data.agent);
        /*
        if(debug)
            $("<span>&nbsp;&nbsp;&nbsp;&nbsp;" + raw.data.from.properties.name + " changed the bg color to " + raw.data.msg + "</span><br />").prependTo("#debug");
        */  
        });

	}); 
  
  });