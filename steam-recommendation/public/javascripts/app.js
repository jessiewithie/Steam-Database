var app = angular.module('angularjsNodejsTutorial', []);

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
  $scope.msg="Doom"
  $scope.thumb = function(msg){
    var hre = '/search?msg='+msg;
    window.location = hre;
  }
  $scope.submitId = function() {
    $scope.review =  $scope.genres.rows;
  } 
});

// Controller for the Search Page
app.controller('searchController', function($scope, $http) {
  var urlValue="";
  var href = location.href;
  console.log(href);
  urlValue = href.substring(href.indexOf("=")+1);
  console.log(urlValue);
  var message = urlValue;
  // var message = angular.fromJson(urlValue);
  if(message.length > 0){
    $http({
      url: "/search/" + message,
      method: "GET"
    }).then(
      res => {
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var gameArray = res.data.rows;
        
        Promise.all(gameArray.map(game =>
          fetch(proxyurl + 'https://store.steampowered.com/api/appdetails?appids=' + game[1])
            .then(response => response.text())                
            .then(contents => {
            var gamedata = JSON.parse(contents)[game[1]].data;
            game.push(gamedata.header_image);
            game.push(gamedata.short_description);})
            .catch(() => console.log("Can’t access " + 'https://store.steampowered.com/api/appdetails?appids=' + game[1] + " response. Blocked by browser?"))
            )).then(function(){$scope.gameInfo = res.data.rows; $scope.$apply();});
  
      },
      err => {
        console.log("Genre ERROR: ", err);
      }
    );
  }

  $scope.submitName = function() {
    $http({
      url: '/search/' + $scope.gameName,
      method: 'GET'
    }).then(res => {
      
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      var gameArray = res.data.rows;
      
      Promise.all(gameArray.map(game =>
        fetch(proxyurl + 'https://store.steampowered.com/api/appdetails?appids=' + game[1])
          .then(response => response.text())                
          .then(contents => {
          var gamedata = JSON.parse(contents)[game[1]].data;
          game.push(gamedata.header_image);
          game.push(gamedata.short_description);})
          .catch(() => console.log("Can’t access " + 'https://store.steampowered.com/api/appdetails?appids=' + game[1] + " response. Blocked by browser?"))
          )).then(function(){$scope.gameInfo = res.data.rows; $scope.$apply();});

    }, err => {
      console.log("SearchGames ERROR: ", err);
    });
    
  }
});

app.service('myService', function(){
  var game_name = '';
  this.get_game_name = function(){
    return game_name;
  }
})

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

//query the genres for the genre filter
  $scope.selectedGenre = ["0"];
  $http({
    url: "/filterLangs",
    method: "GET"
  }).then(
    res => {
      console.log("Lang: ", res.data);
      $scope.langs = res.data.rows;
    },
    err => {
      console.log("Lang ERROR: ", err);
    }
  );

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
