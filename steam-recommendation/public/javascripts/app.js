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

//I'm not sure if this works 
// app.config(function ($stateProvider, $urlRouterProvider) {

//       $stateProvider
//       .state('nav', {
//       url: '/nav',
//       templateUrl: 'views/nav.html',
//       controller: 'navController'
//       })
//       .state('detail', {
//        url: '/detail/:title',
//        templateUrl: 'views/detail.html',
//       //params: {'title': null},
//        controller: 'detailController'
//       });
//       $urlRouterProvider.otherwise("/nav");
//   });

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
  $scope.thumb = function(){
    window.location = '/search';
  }
  $scope.submitId = function() {
    $scope.review =  $scope.genres.rows;
  } 
});

// Controller for the Recommendations Page
app.controller('searchController', function($scope, $http) {
  // TODO: Q2
  $http({
      url: "/search/:recommend",
      method: "GET"
    }).then(
      res => {
        // console.log("DECADES: ", res.data);
        // $scope.decades = res.data;
      },
      err => {
        // console.log("DECADES ERROR: ", err);
      }
    );
});

// Controller for the Nav and Detail Of Page
app.controller('navController', function ($scope, $http) {

  //query years for the genre filter
  $scope.selectedYear = ["0"];
  
  //03-19
  $http({
    url: "/filterYears",
    method: "GET"
  }).then(
    res => {
      console.log("Year: ", res.data);
      $scope.years = res.data.rows;
    },
    err => {
      console.log("Genre ERROR: ", err);
    }
  );
  
  
  //query the genres for the genre filter
  $scope.selectedGenre = ["0"];
  $http({
    url: "/filterGenres",
    method: "GET"
  }).then(
    res => {
      console.log("Genre: ", res.data);
      $scope.genres = res.data.rows;
    },
    err => {
      console.log("Genre ERROR: ", err);
    }
  );

  // query the price ranges for the genre filter
  $scope.selectedPr = { pr: "0" };
  $scope.prs = [
    { pr: "FREE"},
    { pr: "<$50" },
    { pr: "$50-100" },
    { pr: "$100-150" },
    { pr: "$150-250" },
    { pr: "$250-400" },
    { pr: "$400-600" },
    { pr: "$600+" }
  ];


    //score default values 0 --> aka nothing selected
$scope.submitFilterCriteria = function() {
    $http({
      url:
        "/filteredData/" +
        $scope.selectedGenre[0] +
        "/" +
        $scope.selectedPr.pr +
        "/" +
        $scope.selectedYear[0],
      method: "GET"
    }).then(
      res => {
        console.log("SELECTEDFILTERCRITERIA: ", res.data);
        $scope.bestofGames = res.data.rows;
      },
      err => {
        console.log("SELECTEDFILTERCRITERIA: ", err);
      }
    );
  };

});

//I need game names from Nav page just like the dashboaed page in hw2

app.controller('detailController', function($scope, $http) {
      // $http({
      //   url: '/detail/:Portal',
      //   method: 'GET'
      // }).then(res => {
      //   console.log("DETAIL: ", res.data);
      //   // console.log($scope);
      //   $scope.testdata = res.data.rows[0];
      //   //console.log($scope.testdata[0]);
      // }, err => {
      //   console.log("DETAIL ERROR: ", err);
      // });
      $scope.showDetail = function() {
        $http({
        url: '/detail/' + $scope.gameName,
        method: 'GET'
      }).then(res => {
        console.log("DETAIL: ", res.data);
        // console.log($scope);
        $scope.detail = res.data.rows[0];
        console.log($scope.gameName);
        console.log($scope.detail);
      }, err => {
        console.log("DETAIL ERROR: ", err);
      });

        $http({
        url: '/detail/rec/' + $scope.gameName,
        method: 'GET'
      }).then(res => {
        console.log("DETAIL: ", res.data);
        // console.log($scope);
        $scope.rec = res.data.rows[0];
      }, err => {
        console.log("DETAIL ERROR: ", err);
        });
      }
    });



      // $http({
      //   url: '/detail/' + $scope.game,
      //   method: 'GET'
      // }).then(res => {
      //   console.log("DETAIL: ", res.data);
      //   // console.log($scope);
      //   $scope.test = res.data.rows[0];
      //   //console.log($scope.testdata2);
      // }, err => {
      //   console.log("DETAIL ERROR: ", err);
      // });

      
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



// Controller for the login page
app.controller('loginController',function($scope,$http){

});

// Controller for the signup page
app.controller('signUpController',function($scope,$http){

});
