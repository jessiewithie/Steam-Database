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

function doRelease(connection) {
  connection.release(
    function(err) {
      if (err) {
        console.error(err.message);}
    }
  );
}
// 
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
// router.get('/nav', function(req,res){
//   console.log("hehe");
//   alert("YOOO");
//   alert(req.params);

// });

// router.get('/decades', function (req, res) {
  // var query = `
  //   SELECT DISTINCT (FLOOR(year/10)*10) AS decade
  //   FROM (
  //     SELECT DISTINCT release_year as year
  //     FROM Movies
  //     ORDER BY release_year
  //   ) y
  // `;
  // connection.query(query, function (err, rows, fields) {
  //   if (err) console.log(err);
  //   else {
  //     console.log(rows);
  //     res.json(rows);
  //   }
  // });
// });

// router.get("/selectedDecades/:decades", function (req, res) {

  // var decades = req.params.decades;
  // var query = `
  //   WITH top_rats AS(SELECT g1.genre, MAX(m1.vote_count) as max_vc
  //     FROM  Movies m1 JOIN Genres g1 on m1.id=g1.movie_id
  //     WHERE m1.release_year>=${decades} AND m1.release_year<=${decades}+9
  //     GROUP BY g1.genre)
  //   SELECT g.genre, m.title, m.vote_count, m.release_year
  //   FROM Movies m JOIN Genres g on m.id=g.movie_id
  //   WHERE m.release_year>=${decades} AND m.release_year<=${decades}+9 AND 
  //     EXISTS(SELECT * FROM top_rats WHERE top_rats.genre=g.genre AND top_rats.max_vc=m.vote_count)
  //   ORDER BY g.genre;
  // `;
//   res.json([{ name: 'Jani', country: 'Norway'}, 
//             {name:'Hege',country:'Sweden'}, 
//             {name: 'Kai', country:'Denmark'}]);
// });



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
