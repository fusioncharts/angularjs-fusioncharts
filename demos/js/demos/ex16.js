(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex16', {
      templateUrl: 'views/ex16.html',
      controller: 'ex16Controller'
    });
  }]);




  app.controller('ex16Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex16';
    var vm = this,
    chart;
    $rootScope.currentTitle = 'Applying a different theme';        
    
    $scope.myDataSource = {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion"
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
    $scope.selectedTheme = "fusion";
    $scope.initialized = function(chartObj){
      chart = chartObj;
    };

    $scope.applyTheme = function(e){
      chart.setChartAttribute('theme', e.target.value);
    }


  });

}());