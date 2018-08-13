(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex19', {
      templateUrl: 'views/ex19.html',
      controller: 'ex19Controller'
    });
  }]);




  app.controller('ex19Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex19';
    var vm = this;
    $rootScope.currentTitle = 'Dynamically add chart event listener';        
    $scope.message = 'Click on <b>TRACK DATA PLOT CLICK</b>  button to listen to dataplotclick event';
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
    
    $scope.clickHandler = function(e){
      $scope.$apply(function(){
        $scope.message = 'You have clicked on plot '+  e.data.categoryLabel + ' whose value is ' + e.data.displayValue;
      });
    };
    $scope.track = function(){
      FusionCharts.addEventListener('dataplotclick', $scope.clickHandler);
      $scope.message = 'Click on the plot to see the value along with the label';
    };
    $scope.reset = function(){
      FusionCharts.removeEventListener('dataplotclick', $scope.clickHandler);
      $scope.message = 'Click on <b>TRACK DATA PLOT CLICK</b>  button to listen to dataplotclick event';
    }
    $scope.$on('$destroy', function() {
      FusionCharts.removeEventListener('dataplotclick', $scope.clickHandler);
    });

  });

}());