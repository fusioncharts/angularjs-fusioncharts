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
        "caption": "Recommended Portfolio Split",
        "subCaption": "For a net-worth of $1M",
        "showValues": "1",
        "showPercentInTooltip": "0",
        "numberPrefix": "$",
        "enableMultiSlicing": "1",
        "theme": "fusion"
      },
      "data": [{
        "label": "Equity",
        "value": "300000"
      }, {
        "label": "Debt",
        "value": "230000"
      }, {
        "label": "Bullion",
        "value": "180000"
      }, {
        "label": "Real-estate",
        "value": "270000"
      }, {
        "label": "Insurance",
        "value": "20000"
      }]
    };
    $scope.initialized = function(chartObj){
      chart = chartObj;
    };
    $scope.buttonClick = function(e){
        chart.chartType(e.target.value);
    }
  });

}());