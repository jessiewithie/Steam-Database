var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../db-config.js');

/* ----- Connects to your mySQL database ----- */

var mysql = require('mysql');

config.connectionLimit = 10;
var connection = mysql.createPool(config);

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
// router.get('/detail', function(req, res) {
//   res.sendFile(path.join(__dirname, '../', 'views', 'detail.html'));
// });

router.get('/detail', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'detail.html'));
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

/* ----- Q1 (Dashboard) ----- */



/* ----- Q2 (Recommendations) ----- */




/* ----- Q3 (Best Of Decades) ----- */

router.get('/decades', function(req, res) {
  var query = `
    SELECT DISTINCT (FLOOR(year/10)*10) AS decade
    FROM (
      SELECT DISTINCT release_year as year
      FROM Movies
      ORDER BY release_year
    ) y
  `;
  connection.query(query, function(err, rows, fields) {
    if (err) console.log(err);
    else {
      console.log(rows);
      res.json(rows);
    }
  });
});



/* ----- Bonus (Posters) ----- */



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
