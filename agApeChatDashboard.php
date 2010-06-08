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
  <script type="text/javaScript" src="./assests/javascripts/agApeChatDashboard.js"></script>
  
</head>
<?php include_once("/var/ape/db.inc.php");?>
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
          <!-- retrive the values from the ape_rep table and display here -->
          <?php
            $sql = "SELECT chr_id, chr_dateadded, chr_username, chr_session_id, chr_agent, chr_pubid, chr_issue, chr_issue_desc, chr_email from ape_rep ORDER BY chr_dateadded desc";
            //execute the SQL query and return records
			$result = mysql_query($sql);
			$chatQ .= '<table>';
			$chatQ .= '<thead>';
			$chatQ .= '<tr class="odd">';
			$chatQ .= '<th scope="col">DateTime</td>';
			$chatQ .= '<th scope="col">Username</th>';
			$chatQ .= '<th scope="col">Agent Preferred</th>';
			$chatQ .= '<th scope="col">Issue</th>';
			$chatQ .= '<th scope="col">Issue Description</th>';
			$chatQ .= '<th scope="col">Status</th>';
			$chatQ .= '</tr>';	
			$chatQ .= '</thead>';
			
			$i=1;	
			//fetch tha data from the database
			while ($row = mysql_fetch_array($result)) {
   			  if($i%2){
   			  	$chatQ .= '<tr class="odd" id="' . $row['chr_id'] .'">';
   			  }
   			  else{
   			  	$chatQ .= '<tr id="' . $row['chr_id'] .'">';
   			  }
   			  $chatQ .= '<td>' . $row['chr_dateadded'] . '</td>';
			  $chatQ .= '<td>' . $row['chr_username'] . '</td>';
			  $chatQ .= '<td>' . $row['chr_agent'] . '</td>';
			  $chatQ .= '<td>' . urldecode($row['chr_issue']) . '</td>';
			  $chatQ .= '<td>' . urldecode($row['chr_issue_desc']) . '</td>';
			  $chatQ .= '<td>' . '<span id="' . $row['chr_id'] . '"><a class="button support" href="#" onclick="this.blur();" username="' . $row['chr_username'] . '" session="' . $row['chr_session_id'] . '" pubid="' . $row['chr_pubid'] . '" email="' . $row['chr_email'] . '"><span>Support</span></a></span>' . '</td>';
			  $chatQ .= '</tr>';
			  $i++;
   			}
			
			//insert the html
			echo $chatQ;
			
			//close the connection
			mysql_close($dbhandle);
          ?>  
        
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
  <div id="apeUsername" style="display:none"><?php echo 'maanasAgent' ; ?></div>
</body>
    
</html>        
        
        
        
        
