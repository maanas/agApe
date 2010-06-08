// $Id$ 

/**
 * agApeChat
 *
 */

//Use APE JSF build with session
  //APE.Config.scripts = [APE.Config.baseUrl + '/Build/uncompressed/apeCoreSession.js'];

  // create our new shiney APE client  
  var client = new APE.Client;  
    
  // set to false to disable debugging  
  var debug = true;

  $(document).ready(function(){
    // load the APE client  
    client.load({identifier: 'agOfficeDb'}); 

    //Intercept 'load' event. This event is fired when the Core is loaded and ready to connect to APE Server
    client.addEvent('load', function() {
        
      var aun = $('#apeUsername').html();
      //var aun = String((new Date()).getTime()).replace(/\D/gi,'');

      //Call the core start function to connect to APE Server
      client.core.start({"name":aun, "role":"agent"});

    });

    
    client.addEvent('ready', function() {
      
      if(debug)
        $("#debug").append("<span><strong> Client is connected to Ape Server</strong></span><br />");
       
      //1) join 'agOffice'
      client.core.join('agOffice');
        
      
          
      // do the following every time we get a new user
      client.addEvent('multiPipeCreate', function(pipe, options){
        
        // add an event listener on our selectbox
        $("select[name=selectColor]").change(function(){
          // get the select box value
          color = $("option:selected", this).val();
          
          // set the background of the document to the color chosen
          $("#wrapper").css("background-color", color);
          
          // send the new color to the APE server
          
          pipe.send(color);
          
          
        });
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
        

      /// and when we recieve data
      client.onRaw('data', function(raw, pipe){
        //console.log(raw.data.from);  
        
        
        if(debug)
            $("<span>&nbsp;&nbsp;&nbsp;&nbsp;" + raw.data.from.properties.name + " changed the bg color to " + raw.data.msg + "</span><br />").prependTo("#debug");
          
          // set the selectboxes value to match
          $("select[name=selectColor]").val(unescape(raw.data.msg));
          
          // set the color
          $("#wrapper").css("background-color", unescape(raw.data.msg));
        });
        
    });
  
  });