(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex13', {
      templateUrl: 'views/ex13.html',
      controller: 'ex13Controller'
    });
  }]);




  app.controller('ex13Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex13';
    var vm = this;



    var DataSource = dataSource = {
      "chart": {
        "caption": "Nordstorm's Customer Satisfaction Score for 2017",
        "lowerLimit": "0",
        "upperLimit": "100",
        "showValue": "1",
        "numberSuffix": "%",
        "theme": "fusion",
        "showToolTip": "0"
      },
      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": "50",
          "code": "#F2726F"
        }, {
          "minValue": "50",
          "maxValue": "75",
          "code": "#FFC533"
        }, {
          "minValue": "75",
          "maxValue": "100",
          "code": "#62B58F"
        }]
      },
      "dials": {
        "dial": [{
          "value": "81"
        }]
      }
    };
    $scope.myDataSource = DataSource;

    
  });

}());