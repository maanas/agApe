// $Id$ 
/**
  * agApe.mysql.js
  *
  */
/**
  * config information for mysql
  */

var ip = '127.0.0.1';
var user = 'manas';
var password = 'agchat&m4n45';
var db = 'manas';

/**
  * Please do not modify any thing below
  */

  
  function mysqlConnect(ip, user, password, database) {
    
    var sql = new Ape.MySQL(ip + ":3306", user, password, database);

    /*onConnect callback disabled for increased performance */
    sql.onConnect = function() {
        Ape.log('[MySQL] You are now (re)connected to MySQL server');
    }
    
    //onError callback
    sql.onError = function(errorNo) {
        Ape.log('Connection error ' + errorNo +' '+ this.errorString());
    }   
    return sql;
}
 
//connect to MySQL Server
/**
* /!\ You must specify a user and password, mysql module does not support yet connecting with a user without password. /!\
*/
    var logger = mysqlConnect(ip, user, password, db);
 
 
    //Set up a pooller to send keep alive request each 2minutes
    (function() {
        logger.query('SELECT 1', function(res, errorNo) {
            if (errorNo == 8) {//Something went wrong, connection has been closed
                logger =  mysqlConnect(ip, user, password, db);  //Reconnect to MySQL Server
            }
        }.bind(this));
    }).periodical(1000*60*2);
