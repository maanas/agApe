// $Id$ 
/**
 * agApeServer.log.js
 * @desc
 * All database logging hook are defined here. All message flowing through the Ape Server are logged in mysql database
 */
 
//Note that all objects passed to Events are persistent.
//This means that you can store private data inside user, channel, ...

//global variables
var agRep = null;
var agOffice = null;

/* Fired when a connect is issued ; log the user session info in the database*/
Ape.registerHookCmd("connect", function(params, info) {
  
  // any authetication to be places here
  // as of not all authentication to be handled by the php script
  
  //register user property at connect time
  //check user role restrict to only two types of users
  if(params.role == 'rep'){
    //if rep then set issue, issue_desc, email, agent in user session
    //set custom user property
    info.user.setProperty('role', params.role);
    info.user.setProperty('chat_type', params.type);
    info.user.setProperty('issue', params.issue);
    info.user.setProperty('issue_desc', params.issue_desc);
    info.user.setProperty('email', params.email);
    info.user.setProperty('agent', params.agent);
  }
  else if(params.role == 'agent'){
    //if agent then log in ape_chat_agent table
    info.user.setProperty('role', params.role);
    info.user.setProperty('chat_type', params.type);
  }
  
  /*
  else {
    return ["100", "IMPROPER ROLE"];
     
  }
  */
  
  // set data in  mysql table
  var queryString =  "INSERT INTO ape_session (chs_id, chs_dateadded, chs_username, chs_role,  chs_type, chs_session_id, chs_pubid, chs_ip) VALUES (0, " + Math.floor(new Date().getTime() / 1000) + ", '" + params.name + "', '" + params.role + "', '" + params.chat_type + "', '" + info.user.getProperty('sessid') + "', '" + info.user.pipe.getProperty('pubid') + "', '" +  info.user.getProperty('ip') + "')"; 
     
  logger.query(queryString, function(res, errorNo) {
    if (errorNo) {
      Ape.log('MySQL error : ' + errorNo + ' : '+ this.errorString());
    }
  }); 
  
  return 1;
});


/* Fired when a user object is created ; log the user info in the respective database*/  
Ape.addEvent('init', function() { 
  agRep = Ape.mkChan("agRep");
  agOffice = Ape.mkChan("agOffice");
  return 1;
}) ; 


/* Fired when a user object is created ; log the user info in the respective database*/  
Ape.addEvent("adduser", function(user) {

  //check user role restrict to only two types of users
  if(user.getProperty('role') == 'rep'){
    //if rep then update chat_type, issue, issue_desc, email, agent in ape_chat_rep table
    // set data in  mysql table
    var queryString =  "INSERT INTO ape_rep (chr_id, chr_dateadded, chr_username, chr_role,  chr_session_id, chr_pubid, chr_ip, chr_type, chr_issue, chr_issue_desc, chr_email, chr_agent) VALUES (0, " + Math.floor(new Date().getTime() / 1000) + ", '" + user.getProperty('name') + "', '" + user.getProperty('role') + "', '" + user.getProperty('sessid') + "', '" + user.pipe.getProperty('pubid') + "', '" +  user.getProperty('ip') + "', '" + user.getProperty('chat_type') + "', '" + user.getProperty('issue') + "', '" + user.getProperty('issue_desc') + "', '" + user.getProperty('email') + "', '" + user.getProperty('agent') + "' )"; 
    
  //join agRep non interactive Channel
  user.join("agRep");
  
  }
  
  else if(user.getProperty('role') == 'agent'){
    //if rep then update chat_type, rep,  in ape_chat_gent table
    // set data in  mysql table
    var queryString =  "INSERT INTO ape_agent (cha_id, cha_dateadded, cha_username, cha_role,  cha_session_id, cha_pubid, cha_ip, cha_type) VALUES (0, " + Math.floor(new Date().getTime() / 1000) + ", '" + user.getProperty('name') + "', '" + user.getProperty('role') + "', '" + user.getProperty('sessid') + "', '" + user.pipe.getProperty('pubid') + "', '" +  user.getProperty('ip') + "', '" + user.getProperty('chat_type') + "' )"; 
   
   
  //join agOffice non interactive Channel
  user.join("agOffice");
  
  }
  
  logger.query(queryString, function(res, errorNo) {
    if (errorNo) {
      Ape.log('MySQL error : ' + errorNo + ' : '+ this.errorString());
    }
  }); 
  
  //debug
  //Ape.log(user.getProperty('name') + ': ' +user.getProperty('sessid'));
  
  return 1;  
  
});


/* Fired when a user joins a channel */  
Ape.addEvent("join", function(user, channel) {
  
  //rep can only join agRep channel
  if(user.getProperty('role') == 'rep') {
    if (channel.getProperty('name') == "agRep"){
      //agRep.pipe.sendRaw(user.getProperty('name') + 'had joined agSupport.');
      Ape.log(JSON.stringify(agRep));
      return 1;  
    }
    else {
      return ["100", "REP CANNOT JOIN ON THEIR OWN OTHER THAN agRep CHANNEL"]; 
    }
  }
  else if(user.getProperty('role') == 'agent') {
    if (channel.getProperty('name') == "agOffice"){
      //agOffice.pipe.sendRaw(user.getProperty('name') + 'had joined agSupport.');
      Ape.log(JSON.stringify(agOffice));
      return 1;  
    }
    else {
      return ["100", "AGENT CANNOT JOIN ON THEIR OWN OTHER THAN agOffice CHANNEL"]; 
    }
  }   
  
});




/* Fired when a send is recieved */  
Ape.registerHookCmd("send", function(params, info) {
  //log data in ape_data
  var queryString =  "INSERT INTO ape_data (chd_id, chd_dateadded, chd_username, chd_role,  chd_type, chd_content, chd_channel, chd_pubid) VALUES (0, " + Math.floor(new Date().getTime() / 1000) + ", '" + info.user.getProperty('name') + "', '" + info.user.getProperty('role') + "', '" + info.user.getProperty('chat_type') + "', '" + params.msg + "', '" + params.pipe  + "', '" + info.user.getProperty('pubid') + "' )";
  
  logger.query(queryString, function(res, errorNo) {
    if (errorNo) {
      Ape.log('MySQL error : ' + errorNo + ' : '+ this.errorString());
    }
  }); 
  
  return 1;  

});


/* Fired when a new channel is created */  
Ape.addEvent("mkchan", function(channel) {
  
  //Ape.log(channel);
  return 1;  
});

/* Fired when a new channel is created */  
Ape.addEvent("left", function(channel) {
  
  Ape.log(channel);
  return 1;  
});


/* Fired when a user leaves a channel  */
/* if the user was the last then channel will  be destroyed */
  


/// Customs Commands ///

/* Fired when a user send the support command */  
Ape.registerCmd("SEND_SUPPORT", true, function(params, info) {
	
	//update the database ape_rep on user status
 	var queryString =  "SELECT * FROM ape_rep WHERE chr_id = '" + params.id + "' AND chr_username = '" + params.username + "'";

  
  	logger.query(queryString, function(res, errorNo) {
    	if (errorNo) {
      		Ape.log('MySQL error : ' + errorNo + ' : '+ this.errorString());
    	}
    	
  	}); 

	//write  message on the pipe about support
	var pipe = Ape.getPipe(params.pipe);
 	if (!$defined(pipe)) return ["4400", "PIPE_UNDEFINED"];
 
 	//pipe.sendRaw('SUPPORT_DATA', {"id":params.id, "username":params.username, "agent":params.agent,"from":{"casttype":"uni","pubid":info.user.getProperty('pubid'),"properties":{"role":"agent","name":info.user.getProperty('name')}},"pipe":{"casttype":"multi","pubid":params.pipe,"properties":{"name":"agoffice"}}});
 	
 	pipe.sendRaw('SUPPORT_DATA', {'pipe': pipe.toObject(), 'from': info.user.pipe.toObject(), 'id':params.id, 'username':params.username, 'agent':params.agent});
 	
 	
 	//create custom channel for the agent & user
 	support = Ape.mkChan(params.username + '_' + params.agent);
 	info.user.join(support);
 	
 	//update the user on custom channel about the support & agent
 	
 	
 	return 1;
});


/* Fired when a user send the invite command */  
Ape.registerCmd("invite", true, function(params, info) {

  Ape.log(JSON.stringify (params) );
  return 1;
});


/* Fired when a user send the accept command */  
Ape.registerCmd("accept", true, function(params, info) {

  Ape.log(JSON.stringify (params) );
  return 1;
});
