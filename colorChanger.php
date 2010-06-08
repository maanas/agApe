<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" dir="ltr" lang="en">
<head>  
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <link rel="stylesheet" type="text/css" href="./assests/stylesheets/agApeChatDashboard.css" media="screen" title="Normal" />
  <!-- the APE JavaScript Frame Work -->
  <script type="text/javascript" language="javascript" src="./ape-jsf/Build/uncompressed/apeClientJS.js"></script>
  <!-- the jquery core -->
  <script type="text/javaScript" src="./assests/javascripts/jquery-core.js"></script>
  <!-- the jquery script for the agApeClient -->
  <script type="text/javaScript" src="./assests/javascripts/agApeChat.js"></script>
  
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
      
        <div id="side-bar">
        
        </div> <!--end-sidebar -->
        
        <div id="content">
          <div id="wrapper">
            Change Background Color:
            <select name="selectColor">

              <option value="white" selected="selected">White</option>
              <option value="yellow">Yellow</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
              <option value="pink">Pink</option>
              <option value="purple">Purple</option>

              <option value="black">Black</option>
            </select>
            <p>Simple APE test of where users can change the background color of the page. We also use jQuery</p>
          </div>

        
        </div> <!--end-content -->
        
        <div id="pager">
        
        </div><!--end-pager -->
      
      </div><!--end-main-->
      
      <div id="footer">
      
      </div><!--end-footer-->
      
    </div><!--end-inner-container-->
    
    <div id="debug">
    <h2>Debug</h2>
    </div><!--end-debug-->
  </div><!--end-container -->
  <div id="apeUsername" style="display:none"><?php echo 'maanas' . rand(1,100); ?></div>
</body>
    
</html>        
        
        
        
        
