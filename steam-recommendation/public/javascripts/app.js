var app = angular.module('angularjsNodejsTutorial', []);

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
