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

/* ----- Query test (we will see where to use them)----- */
router.get('/q1', function(req, res) {
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

router.get('/q2', function(req, res) {
  var query = `
SELECT t1.genre, t1.name, t1.recommended_times 
FROM 
(
SELECT g.genre, g.name, count(*) as recommended_times 
FROM genre g
JOIN review_criteria r 
ON g.name = r.title
WHERE r.recommendation = 'Recommended'
GROUP BY genre, name
) t1
JOIN 
(select genre, max(recommended_times) as maxrec from (
SELECT g.genre, g.name, count(*) as recommended_times 
FROM genre g
JOIN review_criteria r 
ON g.name = r.title
WHERE r.recommendation = 'Recommended'
GROUP BY genre, name
) group by genre) t2
ON t1.recommended_times = t2.maxrec and t1.genre = t2.genre
ORDER BY t1.genre
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get('/q3', function(req, res) {
  var query = `
SELECT * FROM (
SELECT r2.title, r2.review, r3.helpful FROM review_content r2
JOIN (
SELECT r1.review_id, r1.title, r1.helpful FROM review_criteria r1
RIGHT JOIN(
SELECT title, max(helpful) as maxhelp FROM review_criteria
WHERE title IN (SELECT name
FROM genre g1
WHERE g1.genre IN (SELECT g2.genre FROM genre g2 WHERE name ='Gang Beasts' AND g1.genre=g2.genre))
AND title IN (SELECT name
FROM tag t1
WHERE t1.tag IN (SELECT t2.tag FROM tag t2 WHERE name ='Gang Beasts' AND t1.tag=t2.tag))
GROUP BY title) t1
ON r1.title = t1.title and r1.helpful = t1.maxhelp
ORDER BY r1.helpful DESC
) r3
ON r2.review_id = r3.review_id
)
WHERE ROWNUM<=1
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get('/q4', function(req, res) {
  var query = `
WITH recent_release AS
(SELECT name, release_date
FROM description
WHERE release_date between '1-JAN-19' AND '31-JAN-19'
ORDER BY release_date DESC)
SELECT name, genre
FROM
(SELECT genre.name AS name, genre
FROM recent_release JOIN genre ON
recent_release.name = genre.name)
WHERE ROWNUM <= 10
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get('/q5', function(req, res) {
  var query = `
SELECT *
FROM
(SELECT B.name, C.best_rates, C.max_hours_played
FROM
(SELECT name 
FROM language l
WHERE l.language IN
(SELECT language
FROM language 
WHERE language.name = 'Beat Saber'))B
JOIN 
(SELECT rc.title AS game_name, MAX(rc.helpful) AS best_rates, MAX(rc.hour_played) AS max_hours_played
FROM review_criteria rc 
GROUP BY rc.title) C
ON B.name = C.game_name
ORDER BY C.max_hours_played DESC)D
ORDER BY D.best_rates DESC
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

/* -----  Homepage ----- */

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
router.get('/detail/:Portal', function(req, res){
  var query = `SELECT name, url, release_date, original_price, types, game_description 
  FROM description WHERE name = 'Portal'`;
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});


router.get('/detail/:game', function(req, res){
  //var myGame = req.params.game;
  var query = `SELECT name, url, release_date, original_price, types, game_description 
  FROM description WHERE name = 'DOOM'`;
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});



// "${myGame}"
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
