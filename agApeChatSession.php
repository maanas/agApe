<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" dir="ltr" lang="en">
<head>  
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link rel="stylesheet" type="text/css" href="./assests/stylesheets/agApeChatSession.css" media="screen" title="Normal" />
  <!-- the APE JavaScript Frame Work -->
  <script type="text/javascript" language="javascript" src="./ape-jsf/Build/uncompressed/apeClientJS.js"></script>
  <!-- the jquery core -->
  <script type="text/javaScript" src="./assests/javascripts/jquery-core.js"></script>
  <!-- the jquery script for the agApeClient -->
  <script type="text/javaScript" src="./assests/javascripts/agApeChatSession.js"></script>
  
</head>
<body>

  <div id="container">
    
    <div id="inner-container">
      
      <div id="header">
      
        <div id="tool_bar">
        
        </div>
        
        <div id="tools">
        
        </div>
      
      </div> <!-- end-header -->
      
      <div id="main">
      
        
        <div id="content">
        
          <div id="ape_master_container">
            <div id="ape_container">
              <div class="ape_pipe ">
                <div class="ape_messages">
                </div>
                
              </div>
            </div>
          </div>  
        
          <div id="more">
            <div id="tabbox_container">
              <div class="ape_tab ">
              Agent: Waiting to Connect ...  
              </div>
            </div>
            <div id="ape_sendbox_container">
              <div id="ape_sendbox">
              <form>
                <input autocomplete="off" id="sendbox_input" type="text">
                <input value="" id="sendbox_button" type="button">
              </form>
              </div>
            </div>
          </div>
        </div> <!--end-content -->
        
      
      </div><!--end-main-->
      
      <div id="footer">
      
      </div><!--end-footer-->
      
    </div><!--end-inner-container-->
    
    <div id="debug">
    
    </div><!--end-debug-->
  </div><!--end-container -->
  <div id="apeUsername" style="display:none"><?php echo $_POST['username'] ?></div>
  <div id="apeEmail" style="display:none"><?php echo $_POST['email'] ?></div>
  <div id="apeAgent" style="display:none"><?php echo $_POST['agent'] ?></div>
  <div id="apeIssue" style="display:none"><?php echo $_POST['issue'] ?></div> 
  <div id="apeIssueDesc" style="display:none"><?php echo $_POST['description'] ?></div> 
</body>
    
</html>        
        
        
        
        