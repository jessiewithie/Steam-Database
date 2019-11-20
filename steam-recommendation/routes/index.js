var express = require('express');
var router = express.Router();
var path = require('path');
// var config = require('../db-config.js');

/* ----- Connects to your mySQL database ----- */

// var mysql = require('mysql');
var oracledb = require('oracledb');

function sendQuery(queryString, callback){
  oracledb.getConnection({
    user: 'ys',
    password: '31415926',
    connectString: '(DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)'+
    '(HOST = cis550steam.cpsgsprdaigb.us-east-1.rds.amazonaws.com)'+
    '(PORT = 1521))(CONNECT_DATA =(SID = steamdb)))'
      }, function(err, connection) {
      if (err) {
        console.error(err.message);
        return;
      }
    console.log("\nQuery : "+queryString);
    connection.execute(queryString, [],{ maxRows: 1000 },
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      callback(result);
      doRelease(connection);
    });
  });
}
// config.connectionLimit = 20;
// var connection = mysql.createPool(config);


/* ------------------------------------------- */
/* ----- Routers to handle FILE requests ----- */
/* ------------------------------------------- */

/* ----- index page -----*/
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

/* ----- search page ----- */
router.get('/search', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'search.html'));
});

/* ----- nav page ----- */
router.get('/nav', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'nav.html'));
});

/* ----- detail page ----- */
router.get('/detail', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'detail.html'));
});

/* ----- login page ----- */
router.get('/login', function(req, res) {
  // console.log("_dirname");
  res.sendFile(path.join(__dirname, '../', 'views', 'login.html'));
});


/* Template for a FILE request router:

Specifies that when the app recieves a GET request at <PATH>,
it should respond by sending file <MY_FILE>

router.get('<PATH>', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', '<MY_FILE>'));
});

*/


/* ------------------------------------------------ */
/* ----- Routers to handle data requests ----- */
/* ------------------------------------------------ */

/* -----  Homepage ----- */
router.get('/games', function(req, res) {
  var query = `
SELECT review,funny FROM(
SELECT r1.review, r2.funny FROM review_content r1
JOIN review_criteria r2
ON r1.review_id = r2.review_id
WHERE r1.title = 'Dead by Daylight'
ORDER BY r2.funny DESC)
WHERE ROWNUM <= 1
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

/* -----  Search Page ----- */




/* -----  Nav page ----- */



/* ----- Detail Page ----- */

router.get('/detail/:game', function(req, res){
  var myGame = req.params.game;
  var query = `SELECT name, url, release_date, genre, tags, game_details 
  FROM description_dataset WHERE name = "${myGame}"`;
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});




/* General Template for GET requests:

router.get('/routeName/:customParameter', function(req, res) {
  // Parses the customParameter from the path, and assigns it to variable myData
  var myData = req.params.customParameter;
  var query = '';
  console.log(query);
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      // Returns the result of the query (rows) in JSON as the response
      res.json(rows);
    }
  });
});
*/


module.exports = router;
