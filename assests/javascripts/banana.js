// $Id$ 

/**
 * agApeChat
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
  				10:10,
  				11:11,
  				12:12,
  				13:13,
  				14:14,
  				15:15,
  				16:16,
  				17:17,
  				18:18,
  				19:19,
  				20:20,
  				21:21,
  				22:22,
  				23:23,
  				24:24,
  				25:25,
  				26:26,
  				27:27,
  				28:28,
  				29:29,
  				30:30
  				};
  
  // set to false to disable debugging  
  var debug = true;

/**
 * @desc
 * document ready function
 */

  $(document).ready(function(){
    
    //load the accodian
    $("#tabs").tabs();

    // load pressed
    $("#ape_load").click(function() {
      // load the APE client  
      client.load({identifier: 'banana'}); 
    });
    
    //Intercept 'load' event. This event is fired when the Core is loaded and ready to connect to APE Server
    client.addEvent('load', function() {
      if(debug)
        $("#debug").prepend("<span><strong> Ape Client Loaded</strong></span><br />");
    });

    
    // start pressed
    $("#ape_start").click(function() {
      
      //Restrict usernames
      var NICK_REGEX = /^[a-z0-9\-_]{2,20}$/i;
      var aun = $("#username").val();
      var role = $("#role").val();
      
      if(aun == ""){
        alert('Ape username is blank. Ape Cannot start with blank username.');
        return;
      }
      else {
        if(!aun.match(NICK_REGEX)) {
          alert('Invalid Charactor in username');
          return;
        }
      }
      
      if(role == ""){
        alert('Ape role is blank. Ape Cannot start with blank role.');
        return;
      }
      else {
        if(!role.match(NICK_REGEX)) {
          alert('Invalid Charactor in role');
          return;
        }
      }
      //check that Ape client is loaded 
      if(!client.core){
        alert('Ape Client is not loaded.');
      }
      else {
        //Call the core start function to connect to APE Server
        //check session status
        if(!client.core.options.restore){
          client.core.start({"name":aun, "role":role});
        } else {
          client.core.start();
        }
          
      }
    });
    
    // exit pressed
    $("#ape_exit").click(function() {
    
      
      //check that Ape client is loaded 
      if(!client.core){
        alert('Ape Client is not loaded cannot exit.');
      }
      else {
        //Call the core start function to connect to APE Server
        client.core.quit();
      }
    });


    // channel_join pressed
    $("#channel_join").click(function() {
      
      //Restrict usernames
      var NICK_REGEX = /^[a-z0-9\-_]{2,20}$/i;
      var cn = $("#channel_name").val();

      if(cn == ""){
        alert('Channel name is blank. Ape cannot connect to blank channel.');
        return;
      }
      else {
        if(!cn.match(NICK_REGEX)) {
          alert('Invalid Charactor in channel name');
          return;
        }
      }
      
      //check that Ape client is loaded 
      if(!client.core){
        alert('Ape Client is not loaded cannot join.');
        return;
      }
      else {
        //1) join the channel
        client.core.join(winPipeMap[cn].getPubid());
      
      }
      
      $("#channel_status").append('<div id="'+cn +'">' + cn + '</div>');
    });

    // channel_left pressed
    $("#channel_left").click(function() {
      
      //Restrict usernames
      var NICK_REGEX = /^[a-z0-9\-_]{2,20}$/i;
      var cn = $("#channel").val();
      
      if(cn == ""){
        alert('Channel name is blank. Ape cannot dis-connect from blank channel.');
        return;
      }
      else {
        if(!cn.match(NICK_REGEX)) {
          alert('Invalid Charactor in channel name');
          return;
        }
      }
      
      //check that Ape client is loaded 
      if(!client.core){
        alert('Ape Client is not loaded cannot join.');
        return;
      }
      else {
        //1) join the channel
        client.core.left(winPipeMap[cn].getPubid());
      
      }
      var cnr = '#' + cn;
      $(cnr).remove(); 
    });

    
    
    client.addEvent('ready', function() {
      
      if(debug)
        $("#debug").append("<span><strong> Client is connected to Ape Server</strong></span><br />");
           
    }); 
          
    
    // do the following every time we get a new user
    client.addEvent('multiPipeCreate', function(pipe, options){
      
      if(debug)
        $("#debug").append("<span><strong>New user connected to " + pipe.name + "</strong></span><br />");

      //save winid and pubid map on server
      winid++;

      var pubid = pipe.getPubid();
      winPipeMap[winid]=pubid;      
      console.log(winPipeMap);
 	  var sWinPipeMap = JSON.stringify(winPipeMap);
 	  console.log(sWinPipeMap);
 	  client.core.setSession({'myWinPipe':sWinPipeMap});
      
    });
 
    $("#pipe_dump").click(function(){
      var pipe_pubid = $("#pipe_pubid").val();
      alert(pipe_pubid);
      if(pipe_pubid == ""){
        alert('Pipe pubid is blank. Ape cannot dump null pipe in console.');
        return;
      }
      
      $.each(myPipes, function(intIndex, objValue ){
        if(objValue.pipe.properties.pubid == pipe_pubid){
        console.log(objValue);
        }
      });
    });
    
    
    $("#pipe_dump_all").click(function(){
       console.log(myPipes);
    });
    
    $("#user_send").click(function(){
      var talk_user = $("#talk_user").val();  
      var talk_user_msg = $("#talk_user_message").val(); 
      alert(talk_user + " " + talk_user_msg); 
    });
    
    $("#channel_send").click(function(){
 
      var talk_chl = $("#talk_chl").val(); 
      var talk_chl_msg = $("#talk_chl_message").val(); 
      
      client.core.getSession('myWinPipe', function(response) {
        sWinPipeMap = decodeURIComponent(response.data.sessions.myWinPipe);
        nWinPipeMap = JSON.parse(sWinPipeMap);
        console.log(nWinPipeMap);
      });

      console.log(winPipeMap[talk_chl]);

      currentPipe = client.core.getPipe(winPipeMap[talk_chl]);

      currentPipe.send(talk_chl_msg);
    });
    
    
    // when a user joins, update the user list
    client.addEvent('userJoin', function(user, pipe){
        user.element = $("<span>" + user.properties.name + " has joined " + pipe.name + " </span><br />").prepend("<img src='bullet_green.png' />").prependTo("#debug");
      });

    // when a user leaves, destroy them with mighty thunder!
    client.addEvent('userLeft', function(user, pipe){
        $(user.element).text(user.properties.name + " has left " + pipe.name).css("color", "#666666").prepend("<img src='bullet_red.png' />");
      });

    // when we want to send data
    client.onCmd('send', function(data, pipe){
        if(debug)
          $("<span>" + client.core.user.properties.name + " sending " + data.msg + "</span> on Channel:" + pipe.properties.name + "<br />").prependTo("#debug");
          //console.log(pipe);
      });
      

    /// and when we recieve data
    client.onRaw('data', function(raw, pipe){
      
      //console.log(raw);  
      
      if(debug)
          $("<span>" + raw.data.from.properties.name + " recieving " + raw.data.msg + "</span><br />").prependTo("#debug");

      });
      

   //client.addEvent('onRaw', function(raw, pipe) { console.log(raw) });
  });