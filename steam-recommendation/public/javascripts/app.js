var app = angular.module('angularjsNodejsTutorial', []);
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// var session = require('express-session')
// app.use(session({
//   secret: 'secret',
//   resave: true,
//   saveUninitialized: true
// }));

// Controller for the Dashboard page
app.controller('indexController', function($scope, $http) {
  
  $http({
    url:'/q1',
    method:'GET',
  }).then(res=>{
    console.log("GAMES:", res.data);
    //store the response data to $scope.genres
    $scope.genres = res.data;
    console.log("111");
  },err =>{
    console.log("Games ERROR: ",err);
  });
  $scope.submitId = function() {
    $scope.review =  $scope.genres.rows;
  } 
});

// Controller for the Recommendations Page
app.controller('recommendationsController', function($scope, $http) {
  // TODO: Q2
});

// Controller for the Nav and Detail Of Page
app.controller('navController', function ($scope, $http) {
  // sample HTTP code to get data
  // $http({
  //   url: "/decades",
  //   method: "GET"
  // }).then(
  //   res => {
  //     console.log("DECADES: ", res.data);
  //     $scope.decades = res.data;
  //   },
  //   err => {
  //     console.log("DECADES ERROR: ", err);
  //   }
  // );
  $scope.selectedDecade = { decade: "0" };
  $scope.decades = [{ decade: '2010' },
                    { decade: '2011' },
                    { decade: '2012' },
                    { decade: '2013' }];
  
  $scope.selectedGenre = { genre: "0" };
  // $scope.genres = [
  //   { genre: "Adventure" },
  //   { genre: "Adventure" },
  //   { genre: "Adventure" }
  // ];

    //query the genres for the genre filter
    $http({
      url: "/filterGenres",
      method: "GET"
    }).then(
      res => {
        console.log("Genre: ", res.data);
        $scope.genres = res.data.rows;
        console.log("HEHEHE")
      },
      err => {
        console.log("Genre ERROR: ", err);
      }
    );





  $scope.selectedPr = { pr: "0" };
  $scope.prs = [
    { pr: "$10-50" },
    { pr: "$50-100" },
    { pr: "$100-150" }
  ];

  // $scope.submitFilterCriteria = function() {
  //   alert("Price range:" +
  //     $scope.selectedPr.pr +
  //       ", genre:" +
  //       $scope.selectedGenre.genre +
  //       ", decade" +
  //       $scope.selectedDecade.decade
  //   );

    //score default values 0 --> aka nothing selected
$scope.submitFilterCriteria = function() {
    var url_str =
      "/filteredData/" +
      "pr=" +
      $scope.selectedPr.pr +
      "&genre=" +
      $scope.selectedGenre.genre +
      "&decade=" +
      $scope.selectedDecade.decade;
    // alert(url_str);
    var tst_url_str = $scope.selectedGenre[0];
    $http({
      url: "/filteredData/" + tst_url_str,
      method: "GET"
    }).then(
      res => {
        console.log("SELECTEDFILTERCRITERIA: ", res.data);
        // $scope.filterResults = res.data;
        $scope.bestofGames = res.data.rows;
      },
      err => {
        console.log("SELECTEDFILTERCRITERIA: ", err);
      }
    );


    // $http({
    //   url: "/detail/:Portal",
    //   method: "GET"
    // }).then(
    //   res => {
    //     console.log("DETAIL: ", res.data.rows);
    //   },
    //   err => {
    //     console.log("DETAIL ERROR: ", err);
    //   }
    // );
  };

});

//I need game names from Nav page just like the dashboaed page in hw2

app.controller('detailController', function($scope, $http) {
      $http({

        url: '/detail/:Portal',
        method: 'GET'
      }).then(res => {
        console.log("DETAIL: ", res.data);
        // console.log($scope);
        $scope.testdata = res.data.rows[0];
        // console.log($scope.testdata.rows[0][0]);

      //   url: '/detail/:game',
      //   method: 'GET'
      // }).then(res => {
      //   console.log("DETAIL: ", res.data);
      //   console.log($scope);
      //   // $scope.testdata = res.data;
      //   // console.log($scope.testdata);
      }, err => {
        console.log("DETAIL ERROR: ", err);
      });

      
    // $scope.showDetails= function() {
      
    //   $http({
    //     url: '/detail/' + g.game,
    //     method: 'GET'
    //   }).then(res => {
    //     console.log("DETAIL: ", res.data);
    //     $scope.details = res.data;
    //   }, err => {
    //     console.log("DETAIL ERROR: ", err);
    //   });
  //}

});

// Controller for the login page
app.controller('loginController',function($scope,$http){

});

// Controller for the signup page
app.controller('signUpController',function($scope,$http){

});
