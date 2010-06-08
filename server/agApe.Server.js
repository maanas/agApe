// $Id$ 
/**
 * agApeServer.apps.js
 * @desc
 * Application file loads all the modules of the agApeChatServer  here
 */
 
include("apps/agApe.mysql.js");
  Ape.log('[agApeServer] MySQL extension loaded.');
include("apps/agApe.Server.main.js");
  Ape.log('[agApeServer] Logger extension loaded.');
//include("apps/agApe.Server.init.js");
  //Ape.log('[agApeServer] Init extension loaded.');
//include("apps/agApe.Server.test.js");
  //Ape.log('[agApeServer] Testing extension loaded.');
