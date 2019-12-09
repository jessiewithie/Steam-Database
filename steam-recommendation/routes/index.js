var express = require('express');
var router = express.Router();
var path = require('path');
// var config = require('../db-config.js');

/* ----- Connects to your oracleDb database ----- */
var oracledb = require('oracledb');
var mongodb = require("mongodb");
/* ----- Connects to your mongoDB database ----- */
const addr = "mongodb+srv://yashu:31415926@cluster0-syao4.mongodb.net/test?retryWrites=true&w=majority";

function insertToMongoDB(review, callback) {
  mongodb.MongoClient.connect(addr, function(error, db){
      if (error) throw error;
      var userInfo = db.db("cis550").collection("userInfo");
      userInfo.insert(review, function(err, res){
      if(err) throw err;
        console.log('data inserted');
        console.log(res);
      db.close();
    });
  });
}

function sendMongoDBQuery(username,password, callback) {
  mongodb.MongoClient.connect(addr, function(error, db){
      if (error) throw error;
      var user = db.db("cis550").collection("userInfo");
      user.find({"username" : username,"password":password}).toArray(function(error, result) {
        console.log("hello here");
        callback(result);
        if(error) throw error;
        console.log("??");
      });
  });
}

//oracleDB
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

/* ----- sign up ----- */
router.get('/signUp', function(req, res) {
  res.sendFile(path.join(__dirname, '../', 'views', 'signUp.html'));
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
/*
   most funniest review
 */
router.get('/q1', function(req, res) {
  var query = `
  SELECT title 
  FROM(
  SELECT title FROM
  (SELECT title, max(helpful) AS max
  FROM review_criteria
  GROUP BY title) 
  ORDER BY max) 
  WHERE rownum <= 1
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get('/q2', function(req, res) {
  var query = `
  SELECT name 
  FROM
  (SELECT name,release_date
  FROM release_date 
  WHERE release_date < '12-DEC-19'
  ORDER BY release_date DESC)
  WHERE ROWNUM <= 1
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});
router.get('/q3', function(req, res) {
  var query = `
  SELECT title
  FROM
  (SELECT title
  FROM review_criteria
  ORDER BY funny DESC, title ASC)
  WHERE ROWNUM <=1
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

/* -----  Search Page ----- */
router.get('/search/:game', function(req, res) {
  var inputGame = req.params.game.split("'").join("''");
  var query = `
    SELECT name, appid
    FROM description
    WHERE lower(name) LIKE lower('%${inputGame}%')
    ORDER BY name
  `;
  console.log(query);
  sendQuery(query, function(result) {
    console.log(result);
    res.json(result);
  });
});

/* -----------------------------------  Nav page ------------------------------------------------------- */

/* -----  html flat query ----- */
router.get("/filterGenres", function(req, res) {
  var query = `SELECT DISTINCT GENRE FROM GENRE ORDER BY GENRE`;
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get("/filterYears", function(req, res) {
  var query = `SELECT DISTINCT EXTRACT(year FROM RELEASE_DATE) as year
		FROM RELEASE_DATE
      ORDER BY EXTRACT(year FROM RELEASE_DATE)`;
  sendQuery(query, function(result) {
    res.json(result);
  });
});

router.get("/filterLangs", function(req, res) {
  var query = `SELECT DISTINCT LANGUAGE FROM LANGUAGE ORDER BY LANGUAGE`;
  sendQuery(query, function(result) {
    res.json(result);
  });
});

/* -----  query functions ----- */
router.get('/filteredData/:genre/:price/:year/:lang', function(req,res){
  console.log(req.params);
  var i;

  //genre
  var genre = req.params.genre;
  var select_genre;
  if (genre === "0" || genre === "undefined" || genre === "--Genre--") {
    select_genre = "";
  } else {
    select_genre =
      ` title IN (SELECT name
    FROM genre g1
    WHERE g1.genre='` +
      genre +
      `') `;
  }
  
  //price
  var price_condition = req.params.price;
  // var select_price = `
  //    title IN (SELECT name
  //   FROM price p1
  //   WHERE p1.ORIGINAL_PRICE>0 AND p1.ORIGINAL_PRICE<50)`;
  var select_price = `
     title IN (SELECT name
      FROM price p1
      WHERE `;
  if (price_condition === "0") {
    select_price = "";
  } else {
    if (price_condition === "FREE") {
      price_condition = "p1.ORIGINAL_PRICE=0) ";
    } else if (price_condition === "<$50") {
      price_condition = "p1.ORIGINAL_PRICE>0 AND p1.ORIGINAL_PRICE<50) ";
    } else if (price_condition === "$600+") {
      price_condition = "p1.ORIGINAL_PRICE>500) ";
    } else if (price_condition === "$50-100") {
      price_condition = "p1.ORIGINAL_PRICE>50 AND p1.ORIGINAL_PRICE<=100) ";
    } else if (price_condition === "$100-150") {
      price_condition = "p1.ORIGINAL_PRICE>100 AND p1.ORIGINAL_PRICE<=150) ";
    } else if (price_condition === "$150-250") {
      price_condition = "p1.ORIGINAL_PRICE>150 AND p1.ORIGINAL_PRICE<=250) ";
    } else if (price_condition === "$250-400") {
      price_condition = "p1.ORIGINAL_PRICE>250 AND p1.ORIGINAL_PRICE<=400) ";
    } else if (price_condition === "$400-600") {
      price_condition = "p1.ORIGINAL_PRICE>400 AND p1.ORIGINAL_PRICE<=600) ";
    }
    select_price = select_price + price_condition;
  }

  // year!
  var year_condition = req.params.year;
  var select_year;
  if (year_condition === "0") {
    select_year = "";
  } else {
    select_year =
      ` title IN (SELECT name
        FROM RELEASE_DATE r1
        WHERE EXTRACT(year FROM r1.RELEASE_DATE) = ` +
      year_condition +
      ` ) `;
  }

  // language！
  var lang_condition = req.params.lang;
  console.log(lang_condition);
  var select_lang;
  if (lang_condition === "0") {
    select_lang= "";
  } else {
    select_lang =
      ` title IN (SELECT name FROM LANGUAGE l1 WHERE LANGUAGE = '` +
      lang_condition +
      `' ) `;
  }

  // determin filtering conditions
  var filters = "";
  if (select_price.length > 0){
    filters = filters + " AND " + select_price;
  } 
  if (select_genre.length > 0) {
    filters = filters + " AND " + select_genre;
  }
  if (select_year.length > 0) {
    filters = filters + " AND " + select_year;
  }
  if (select_lang.length > 0) {
    filters = filters + " AND " + select_lang;
  }
  if(filters.length > 0){
    filters = filters.substring(4);
    filters = " WHERE "+filters;
  }

  // console.log(filters);
  
  // query!
  var query =
    `
    SELECT TITLE, REVIEW, APPID FROM(
SELECT TITLE, MAX(REVIEW) AS REVIEW FROM (
    SELECT r2.title, r2.review, r3.helpful FROM review_content r2
    JOIN (
    SELECT r1.review_id, r1.title, r1.helpful FROM review_criteria r1
    RIGHT JOIN(
    SELECT title, max(helpful) as maxhelp FROM review_criteria
    ` +
    filters +
    ` GROUP BY title) t1
    ON r1.title = t1.title and r1.helpful = t1.maxhelp
    ORDER BY r1.helpful DESC
    ) r3
    ON r2.review_id = r3.review_id
    )
    GROUP BY TITLE
    ) r4 JOIN PRICE p ON p.name=r4.TITLE
  `;
  // connect query
  console.log(query);
  sendQuery(query, function(result) {
    res.json(result);
  });
});



/* ----- Detail Page ----- */
router.get('/detail/:gameName', function(req, res){
  var myGame = req.params.gameName;
  //var myGame = req.params.game;
  console.log(myGame);
  var query = `
SELECT * FROM (select d.name, d.url, d.types, d.game_description, d.developer, d.publisher, p.original_price, r.release_date, 
nvl(rt.review,'No reviews yet'),nvl(rc.helpful,0),nvl(rc.funny,0),genres,tags,languages,d.appid
FROM description d
JOIN price p ON d.name = p.name AND d.name = '${myGame}'
JOIN release_date r ON r.name = p.name
JOIN (select name , listagg(genre,',') within group (order by name) as genres from (SELECT distinct name,genre FROM genre) GROUP BY name) g ON d.name = g.name
JOIN (select name , listagg(tag,',') within group (order by name) as tags from (select distinct name,tag from tag) GROUP BY name) t ON d.name = t.name
JOIN (select name , listagg(language,',') within group (order by name) as languages from (select distinct name,language from language) GROUP BY name) l ON d.name = l.name
LEFT JOIN review_criteria rc ON rc.title = d.name
LEFT JOIN review_content rt ON rc.review_id = rt.review_id
ORDER BY rc.helpful,rc.funny,rc.date_posted) WHERE ROWNUM<=5`;
  console.log(query);
  sendQuery(query, function(result) {
    console.log(result);
    res.json(result);
  });
});

router.get('/detail/rec/:gameName', function(req, res){
  var myGame = req.params.gameName;
  //var myGame = req.params.game;
  console.log(myGame);
  var query = `
SELECT t1.name, t1.genre, t1.recommended_times 
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
router.post('/user', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  sendMongoDBQuery(username,password,function(result) {
    res.json(result);
  });
});

router.post('/adduserInfo', function(req, res) {
  var insert = {"username":req.body.username,"password":req.body.password};
  console.log(insert);
  insertToMongoDB(insert, function(result) {
        res.json(result);
  });
});


module.exports = router;
