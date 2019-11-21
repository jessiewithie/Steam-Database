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
    url:'/games',
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

  $scope.decades = [{ decade: '2010' },
                    { decade: '2011' },
                    { decade: '2012' },
                    { decade: '2013' }];

  $scope.submitDecade = function () {
    $http({
      url: "/selectedDecades/" + $scope.selectedDecade.decade,
      method: "GET"
    }).then(
      res => {
        console.log("SELECTEDDECADES: ", res.data);
        $scope.bestofMovies = res.data;
      },
      err => {
        console.log("SELECTEDDECADES: ", err);
      }
    );
  }

});

//I need game names from Nav page just like the dashboaed page in hw2

app.controller('detailController', function($scope, $http) {
    $scope.showDetails= function(g) {
      
      $http({
        url: '/detail/' + g.game,
        method: 'GET'
      }).then(res => {
        console.log("DETAIL: ", res.data);
        $scope.details = res.data;
      }, err => {
        console.log("DETAIL ERROR: ", err);
      });
  }
});

// Controller for the login page
app.controller('loginController',function($scope,$http){

});
