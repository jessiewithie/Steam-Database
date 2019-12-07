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
  
  // $http({
  //   url:'/q1',
  //   method:'GET',
  // }).then(res=>{
  //   console.log("GAMES:", res.data);
  //   //store the response data to $scope.genres
  //   $scope.genres = res.data;
  //   console.log("111");
  // },err =>{
  //   console.log("Games ERROR: ",err);
  // });
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
  if(message.length > 0 && href != "http://localhost:8081/search"){
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
  console.log($scope.selectedGenre);
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
    { pr: "FREE" },
    { pr: "<$50" },
    { pr: "$50-100" },
    { pr: "$100-150" },
    { pr: "$150-250" },
    { pr: "$250-400" },
    { pr: "$400-600" },
    { pr: "$600+" }
  ];

  //query the languages for the language filter
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

  //score default values 0 --> aka nothing selected
  $scope.submitFilterCriteria = function () {
    var genre = "0";
    if (!(typeof $scope.selectedGenre === "undefined")){
      genre = $scope.selectedGenre[0];
    } else if (!(typeof $scope.selectedGenre === "undefined") && $scope.selectedGenre == null){
      genre = "0";
    }
    var pr = "0";
    if (!(typeof $scope.selectedPr === "undefined")) {
      pr = $scope.selectedPr.pr;
    } else if (!(typeof $scope.selectedPr === "undefined") && $scope.selectedPr == null) {
      pr = "0";
    }
    var yr = "0";
    if (!(typeof $scope.selectedYear === "undefined")) {
      pr = $scope.selectedYear[0];
    } else if (!(typeof $scope.selectedYear === "undefined") && $scope.selectedYear == null) {
      yr = "0";
    }
    var lang = "0";
    if (!(typeof $scope.selectedLang=== "undefined")) {
      lang = $scope.selectedLang;
    } else if (!(typeof $scope.selectedLAng === "undefined") && $scope.selectedLang == null) {
      lang= "0";
    }
    $http({
      url:
        "/filteredData/" +
        genre +
        "/" +
        pr +
        "/" +
        yr +
        "/" +
        lang,
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
  $scope.submitUserInfo = function() {
    $http({
      url: '/register',
      method: 'POST',
      data:{
        'username':$scope.username,
        'password':$scope.password
      }
    }).then(res => {
      console.log("hello, I am doing this");
    }, err => {
      console.log("signUp ERROR: ", err);
    });
    
  }
});
