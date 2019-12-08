var app = angular.module('angularjsNodejsTutorial', []);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
});

// Controller for the Dashboard page
app.controller('indexController', function($scope, $http) {
  $scope.thumb = function(){
    var hre = '/search?msg=q1';
    window.location = hre;
  }
  $scope.latest = function(){
    $http({
      url:'/q3',
      method:'GET',
    }).then(res=>{
      console.log("GAMES:", res.data);
      var gameName = res.data.rows[0][0];
      var hre1 = '/detail?msg='+angular.toJson(gameName);
      console.log(hre1);
      window.location = hre1;
    },err =>{
      console.log("Games ERROR: ",err);
    });
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
  // console.log(urlValue);
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
  
  $scope.detail = function(game){
    var hre = '/detail?msg=' + angular.toJson(game);
    window.location = hre;
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

app.controller('detailController', function($scope, $http) {
  var urlValue="";
  var href = location.href;
  console.log(href);
  urlValue = href.substring(href.indexOf("=")+1);
  // console.log(urlValue);
  var message = angular.fromJson(decodeURI(urlValue));
  console.log(message)
  // var message = angular.fromJson(urlValue);
  if(message.length > 0 && href != "http://localhost:8081/search"){
    $http({
      url: "/detail/" + message,
      method: "GET"
    }).then(
      res => {

        $scope.detail = res.data.rows[0];
        var price= res.data.rows[0][6].toString();
        $scope.pricesub = price.substring(0,5);
        var date= res.data.rows[0][7].toString();
        $scope.datesub = date.substring(0,10);
        var des = res.data.rows[0][3].toString();
        $scope.des= des.substring(0,997);
        console.log("Detail:", res.data);
        
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        var gameArray = res.data.rows;
        
          Promise.all(gameArray.map(game =>
          fetch(proxyurl + 'https://store.steampowered.com/api/appdetails?appids=' + game[14])
            .then(response => response.text())                
            .then(contents => {
            var gamedata = JSON.parse(contents)[game[14]].data;
           game.push(gamedata.header_image);//15
            //game.push(gamedata.short_description);//16
            game.push(gamedata.movies);//16
          })
            .catch(() => console.log("Can’t access " + 'https://store.steampowered.com/api/appdetails?appids=' + game[14] + " response. Blocked by browser?"))
            )).then(function(){$scope.gamePic = res.data.rows; $scope.$apply();}
            ); 
      
      },err => {
        console.log("Detail ERROR: ", err);
      });
  }

    // $http({
    //     url: '/detail/' + $scope.game,
    //     method: 'GET'
    //   }).then(res => {
    //     console.log("test: ", res.data);
    //     // console.log($scope);
    //     $scope.test = res.data.rows[0];
    //     //console.log($scope.testdata2);
    //   }, err => {
    //     console.log("DETAIL ERROR: ", err);
    //   });

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
  $scope.signIn = function() {
    $http({
     url: '/user',
     method: 'POST',
     data: ({
       'username' : $scope.username,
       'password' : $scope.password
     })
   }).then(res => {
     console.log("LOGIN: ", res.data);
   }, err => {
     console.log("LOGIN ERROR: ", err);
   });
  }
});

// Controller for the signup page
app.controller('signUpController',function($scope,$http){
  $scope.submitUserInfo = function() {
   console.log($scope);
   $http({
    url: '/adduserInfo',
    method: 'POST',
    data: ({
      'username' : $scope.username,
      'password' : $scope.password
    })
  }).then(res => {
        console.log("USER: ", res.data);
  }, err => {
    console.log("USER ERROR: ", err);
  });
  
  }
});
