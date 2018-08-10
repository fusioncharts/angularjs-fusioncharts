(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex22', {
      templateUrl: 'views/ex22.html',
      controller: 'ex22Controller'
    });
  }]);




  app.controller('ex22Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex22';
    var vm = this,
    chart;
    $rootScope.currentTitle = 'Change chart type at run time';
    $scope.chartType = 'column2d'; 

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
        chart.chartType(e.target.value);
        $scope.selected = e.target.value;
    }
  });

}());