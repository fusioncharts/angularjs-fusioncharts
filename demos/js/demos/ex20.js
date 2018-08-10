(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex20', {
      templateUrl: 'views/ex20.html',
      controller: 'ex20Controller'
    });
  }]);




  app.controller('ex20Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex20';
    $rootScope.currentTitle = 'Slice data plots';   
    var chart;   
    
    $scope.myDataSource = {
      "chart": {
        "caption": "Market Share of Web Servers",
        "plottooltext": "<b>$percentValue</b> of web servers run on $label servers",
        "showLegend": "1",
        "showPercentValues": "1",
        "legendPosition": "bottom",
        "useDataPlotColorForLabels": "1",
        "theme": "fusion",
      },
      "data": [{
        "label": "Apache",
        "value": "32647479"
      }, {
        "label": "Microsoft",
        "value": "22100932"
      }, {
        "label": "Zeus",
        "value": "14376"
      }, {
        "label": "Other",
        "value": "18674221"
      }]
    };
    $scope.initialized = function(chartObj){
      chart = chartObj;
    };
    $scope.slice = function(){
      chart.slicePlotItem(1,true);
    }
    $scope.reset = function(){
      chart.slicePlotItem(1,false);
    }

  });

}());