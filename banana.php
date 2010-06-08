<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" dir="ltr" lang="en">
<head>  
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link rel="stylesheet" type="text/css" href="./assests/stylesheets/banana.css" media="screen" title="Normal" />
  <!-- the APE JavaScript Frame Work -->
  <script type="text/javascript" language="javascript" src="./ape-jsf/Build/uncompressed/apeClientJS.js"></script>
  <!-- the jquery core -->
  
  <!-- accodian css -->
  <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css"/>
  <!-- accodian jquery -->
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"></script>
  
  
  

  
  <!-- the jquery script for the agApeClient -->
  <script type="text/javaScript" src="./assests/javascripts/banana.js"></script>
  
</head>
<body>

  <div id="container">
    
    <div id="inner-container">
      <!--
      <div id="header">
        
        <div id="logo">
          <a href="#" title="BANANA: A Tool to train APE <img src="http://static.weelya.org/weelya_ape/imgs/empty.gif" alt="Banana Ape Training Tool" class="logo_img" /></a>
        </div>
        
        <div id="tool_bar">
        
        </div>
        
        <div id="tools">
        
        </div>
      
      </div> <!-- end-header -->
      -->  
      <div id="main">
      
        
        <div id="content">
        
        <div id="tabs">
          <ul>
            <li><a href="#overview"><span>Overview</span></a></li>
            <li><a href="#options"><span>Options</span></a></li>
            <li><a href="#load"><span>Load / Start / Exit</span></a></li>
            <li><a href="#channels"><span>Channel</span></a></li>  
            <li><a href="#pipe"><span>Pipes</span></a></li> 
            <li><a href="#talk"><span>Talk</span></a></li> 
          </ul>


          <div id="overview">
            <p>
            Banana is a tool to train Ape. Banana can be used to test all functionality of Ape. I wrote banana in order to examine and test various idea which I want to implement.
            </p>
          </div>
          
          <div id="options">
            <p>
            Set your Options Here. The jquery engine will read and act accordingly.
            </p>
            <p>
              <label><strong>UserName:</strong></label>
              <input type="text" id="username" name="username" value="" />
              <br />
              Ape will start with this user name.
            </p>
            <p>
              <label><strong>Role:</strong></label>
              <input type="text" id="role" name="role" value="" />
              <br />
              Ape will start with this role.
            </p>
          </div>
          

          <div id="load">
            <p>
            Connect is event is fired on load and Disconnect is fired on exit. Test Ape Client connect / disconnect to APE Server
            </p>
           
            <span id="ape_load"><a class="button" href="#" onclick="this.blur();"><span>LOAD</span></a></span>
            <span id="ape_start"><a class="button" href="#" onclick="this.blur();"><span>START</span></a></span>
            <span id="ape_exit"><a class="button" href="#" onclick="this.blur();"><span>EXIT</span></a></span>
           
           <br />
           <br />
          </div>

  
            <div id="channels">
              <p>
                Join / Left one or more channel(s)
              </p>
              <p>
                <span id="channel_status"><label><strong>Channel Status</strong></label></span>
              </p>
              
              <p>
                <label><strong>Channel:</strong></label>
                <input type="text" name="channel" id="channel_name" value="" />
                <br />
                Ape will join/left this channel.
                <br />
                <span id="channel_join"><a class="button" href="#" onclick="this.blur();"><span>Join</span></a></span>
                <span id="channel_leave"><a class="button" href="#" onclick="this.blur();"><span>Leave</span></a></span>
              </p>  
           
          </div>

          
          <div id="pipe">
            <p>
            Examine all pipes object returned by Ape.
            </p>
            <p>
              <label><strong>pubid:</strong></label>
              <input type="text" name="pipe_pubid" id="pipe_pubid" value="" />
              <br />
              <span id="pipe_dump"><a class="button" href="#" onclick="this.blur();"><span>Dump</span></a></span>
            </p>
            
            <br />
            <p>
              <span id="pipe_dump_all"><a class="button" href="#" onclick="this.blur();"><span>Dump Pipe(s) in console</span></a></span>
            </p>
            <br />
            <br />
          </div>
          
          
          <div id="talk">
            <p>
            Talk to a user with his pubid and examine all user object returned by Ape.
            </p>
            <p>
              <label><strong>user:</strong></label>
              <input type="text" name="talk_user" id="talk_user" value="" />
              <br />
              Send user a message at their pubid.
              <br />
              <label><strong>Message:</strong></label>
              <input type="text" name="talk_user_message" id = "talk_user_message" value="" />
              <br />
              <span id="user_send"><a class="button" href="#" onclick="this.blur();"><span>Send</span></a></span>
            </p>
            <br />
            <p>
            Talk to a channel with his pubid and examine all channel object returned by Ape.
            </p>
            <p>
              <label><strong>channel:</strong></label>
              <input type="text" name="talk_chl" id="talk_chl" value="" />
              <br />
              Send channel a message at their pubid.
              <br />
              <label><strong>Message:</strong></label>
              <input type="text" name="talk_chl_message"  id = "talk_chl_message" value="" />
              <br />
              <span id="channel_send"><a class="button" href="#" onclick="this.blur();"><span>Send</span></a></span>
            </p>
          </div>
          
 
          
        </div> <!--end-accordian -->  

          
        </div> <!--end-content -->
        
      
      </div><!--end-main-->
      
      <div id="footer">
      
      </div><!--end-footer-->
      
    </div><!--end-inner-container-->
    
    <div id="debug">
    
    </div><!--end-debug-->
  </div><!--end-container -->
  <div id="apeUsername" style="display:none"><?php echo 'WildApe' . rand(1,1000); ?></div> 
</body>
    
</html>        
        
        
        
        