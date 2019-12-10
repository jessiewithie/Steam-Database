var app = angular.module("angularjsNodejsTutorial", []);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist(['**']);
});

// Controller for the Dashboard page
app.controller('indexController', function($scope, $http) {
  $scope.thumb = function(){
    $http({
      url:'/rec',
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

  $scope.latest = function() {
    $http({
      url:'/q2',
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
  $scope.funniest = function(){
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
      console.log("Year ERROR: ", err);
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
  $scope.prs = angular.fromJson([
    { pr: "FREE" },
    { pr: "<$50" },
    { pr: "$50-100" },
    { pr: "$100-150" },
    { pr: "$150-250" },
    { pr: "$250-400" },
    { pr: "$400-600" },
    { pr: "$600+" }
  ]);

  //query the languages for the language filter
  $scope.selectedLang = ["0"];
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
  //score default values 0 --> aka nothing selected
  $scope.submitFilterCriteria = function () {
    var genre = "0";
    if (!(typeof $scope.selectedGenre === "undefined")) {
      if ($scope.selectedGenre == null) { genre = "0";}
      else{genre = $scope.selectedGenre[0];}
    }
    var pr = "0";
    if (!(typeof $scope.selectedPr === "undefined")) {
      if ($scope.selectedPr == null){pr = "0";}
      else{pr = $scope.selectedPr.pr;}
    }
    var yr = "0";
    if (!(typeof $scope.selectedYear === "undefined")) {
      if ($scope.selectedYear == null){yr = "0";}
      else {yr = $scope.selectedYear[0];}
    }
    var lang = "0";
    if (!(typeof $scope.selectedLang === "undefined")) {
      if ($scope.selectedLang == null){lang = "0";}
      else {lang = $scope.selectedLang[0];}
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
        $scope.numResults = "Number of Results: " + res.data.rows.length;
      },
      err => {
        console.log("SELECTEDFILTERCRITERIA: ", err);
      }
    );
  };

  $scope.loadMore = function() {
    var last = $scope.bestofGames[$scope.bestofGames.length - 1];
    for (i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };

  $scope.detail = function (game) {
    var hre = '/detail?msg=' + angular.toJson(game);
    window.location = hre;
  }

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
          fetch(proxyurl + 'https://store.steampowered.com/api/appdetails?appids=' + game[12])
            .then(response => response.text())                
            .then(contents => {
            var gamedata = JSON.parse(contents)[game[12]].data;
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
});

// Controller for the login page
app.controller('loginController',function($scope,$http){
  $scope.signIn = function(username,password) {
    $scope.username = username;
    $scope.password = password;
    console.log(typeof username);
    var request = $http({
      url: '/user',
      method: "POST",
      data: {
        'username':username,
        'password':password
      }
    }).then(res=>{
      if(res.status === 200){
        if(JSON.stringify(res.data[0]).length > 0){
        window.location = '/';
        }
      }
    });
    
    
  }
});

// Controller for the signup page
app.controller('signUpController',function($scope,$http){
  $scope.submitUserInfo = function() {
   $http({
    url: '/adduserInfo',
    method: 'POST',
    data: ({
      'username' : $scope.username,
      'password' : $scope.password
    })
  }).then(res => {
    console.log("USER: ", res.data);
    // window.location = '/login';
  }, err => {
    console.log("USER ERROR: ", err);
  });
  }
});
