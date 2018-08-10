(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex16', {
      templateUrl: 'views/ex16.html',
      controller: 'ex16Controller'
    });
  }]);




  app.controller('ex16Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex16';
    var vm = this;
    $rootScope.currentTitle = 'Applying a different theme';        
    $scope.variable = 'hello world';
    setTimeout(function(){
      $scope.$apply(function(){
        $scope.variable = "MyWorld";
      })
    }, 2000);
    
    $scope.myDataSource = {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "gammel"
      },
      "data": [
          { "label": "Venezuela", "value": "290" },
          { "label": "Saudi", "value": "260" },
          { "label": "Canada", "value": "180" },
          { "label": "Iran", "value": "140" },
          { "label": "Russia", "value": "115" },
          { "label": "UAE", "value": "100" },
          { "label": "US", "value": "30" },
          { "label": "China", "value": "30"}
      ]
    };


  });

}());