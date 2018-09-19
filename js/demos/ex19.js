(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex19', {
      templateUrl: 'views/ex19.html',
      controller: 'ex19Controller'
    });
  }]);




  app.controller('ex19Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex19';
    var vm = this,
    disableStyle = {
      'border-color': '#d3d3d3',
      'color': '#d3d3d3',
      'background': 'none',
      'cursor': 'default'
    },
    activeStyle = {
      'border-color': '#6957da',
      'cursor': 'pointer'
    };
    $rootScope.currentTitle = 'Dynamically add chart event listener';        
    $scope.message = 'Click the below buttons to add an event dynamically to the chart';
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
    $scope.trackButton = activeStyle;
    $scope.resetButton = disableStyle;
    
    $scope.clickHandler = function(e){
      $scope.$apply(function(){
        $scope.message = 'You have clicked on plot <b>'+  e.data.categoryLabel + '</b> whose value is <b>' + e.data.displayValue + '</b>';
      });
    };
    $scope.track = function(){
      FusionCharts.addEventListener('dataplotclick', $scope.clickHandler);
      $scope.message = 'Click on the plot to see the value along with the label';
      $scope.trackButton = disableStyle;
      $scope.resetButton = activeStyle;
    };
    $scope.reset = function(){
      FusionCharts.removeEventListener('dataplotclick', $scope.clickHandler);
      $scope.message = 'Click the below buttons to add an event dynamically to the chart';
      $scope.trackButton = activeStyle;
      $scope.resetButton = disableStyle;
    }
    $scope.$on('$destroy', function() {
      FusionCharts.removeEventListener('dataplotclick', $scope.clickHandler);
    });

  });

}());