(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex24', {
      templateUrl: 'views/ex24.html',
      controller: 'ex24Controller'
    });
  }]);




  app.controller('ex24Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex24';
    var vm = this,
    chart;
    $rootScope.currentTitle = 'Update chart attribute through methods';
    $scope.themeName = 'fusion'; 
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
    $scope.initialized = function(chartObj){
      chart = chartObj;
    };
    $scope.buttonClick = function(e){
        chart.setChartAttribute('theme', e.target.value);
    }
  });

}());