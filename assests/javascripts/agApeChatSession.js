// $Id$ 

/**
 * agApeChatSession
 *
 */


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

  //load default variables
  
  $(document).ready(function(){
    
    var aun = $('#apeUsername').html();
    var ar = "agent";
    var ae = $('#apeEmail').html();
    var aa = $('#apeAgent').html();
    var ai = $('#apeIssue').html();
    var ad = $('#apeIssueDesc').html();
    var ac = "support";
    
    
    // load the APE client  
    client.load({identifier: 'agRep'}); 

    //Intercept 'load' event. This event is fired when the Core is loaded and ready to connect to APE Server
    client.addEvent('load', function() {
      
      var opt = {'sendStack': false, 'request': 'stack'};
      //Call the core start function to connect to APE Server
      
      if (!client.core.options.restore) {
       client.core.start({"name":aun, "role":ar, "email":ae, "agent":aa, "issue":ai, "issue_desc":ad,"chat_type":ac});
      }
      else {
        client.core.start();
      }
      
    });

    
    client.addEvent('ready', function() {
      
      if(debug)
        $("#debug").append("<span><strong> Client is connected to Ape Server</strong></span><br />");
      // clinet automatically joins *agRep channel and wait for the agent to start a channel for support
      
      // client joins a test channel
      client.core.join('agOffice');  
      
    });
    
    
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

     
    // when a user joins, display in the status bar 
    client.addEvent('userJoin', function(user, pipe){
        if((user.properties.name == aun)){
          console.log('Self');
        }
        else {
          if(debug)
            $("#debug").append("<span><strong> User:" + user.properties.name + " is connected to ag Support System</strong></span><br />"); 
        } 
      });
  
    //debug dump object
    //client.addEvent('onRaw', function(raw, pipe) { console.log(raw) });
    
    
    client.onRaw('data', function(raw, pipe){
      writeMessage(pipe, raw.data.msg, raw.data.from);
      //console.log(raw);
    });
    
    client.onCmd('send', function(data, pipe){ 
      writeMessage(pipe, data.msg, client.core.user);
      //console.log(data);
    });
    
    client.onError('004', function(){
      client.core.clearSession();
     //restart the core
     var opt = {'sendStack': false, 'request': 'stack'};
      //Call the core start function to connect to APE Server
      client.core.start({"name":aun, "role":"rep", "email":ae, "agent":aa, "issue":ai, "issue_desc":ad,"chat_type":ac});
    });
  
    $("#sendbox_button").click(function(){
 
      var sendbox_input = $("#sendbox_input").val(); 
      
      client.core.getSession('myWinPipe', function(response) {
        //sWinPipeMap = eval(decodeURIComponent(response.data.sessions.myWinPipe));
        //nWinPipeMap = JSON.parse(sWinPipeMap);
        console.log(myWinPipe);
      });

      currentPipe = client.core.getPipe(winPipeMap[0]);

      currentPipe.send(sendbox_input);
      

      $("#sendbox_input").val('');
    
    });
    
    
    function writeMessage(pipe, message, from){
      if(from.properties.name == client.core.user.properties.name){
      var msg = '<div class="self">';
      }
      else {
      var msg = '<div class="other">';
      }
      msg += from.properties.name + ': ';
      msg += decodeURIComponent(message) ;
      msg += '</div>';
      $(".ape_messages").append(msg);
    }   
  
  
  
      
  });