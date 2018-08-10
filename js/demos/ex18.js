(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex18', {
      templateUrl: 'views/ex18.html',
      controller: 'ex18Controller'
    });
  }]);




  app.controller('ex18Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex18';
    var vm = this;
    $rootScope.currentTitle = 'Render Alert';
    
    $scope.message = 'You will see a notification here after chart completes rendering';

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
    $scope.renderComplete = function(){
      $scope.$apply(function(){
        $scope.message = 'Chart has completed rendering';
      });
    }


  });

}());