(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex18', {
      templateUrl: 'views/ex18.html',
      controller: 'ex18Controller'
    });
  }]);




  app.controller('ex18Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex18';
    var vm = this,
    startValue;
    $rootScope.currentTitle = 'Special Events';        
    $scope.dataloaded = '';
    $scope.myDataSource = {
      "chart": {
        "caption": "App Publishing Trend",
        "subCaption": "2012-2016",
        "xAxisName": "Years",
        "yAxisName" : "Total number of apps in store",
        "formatnumberscale": "1",
        "drawCrossLine":"1",
        "plotToolText" : "<b>$dataValue</b> apps on $seriesName in $label",
				"theme": "fusion"
      },

      "categories": [{
        "category": [{
          "label": "2012"
        }, {
          "label": "2013"
        }, {
          "label": "2014"
        }, {
          "label": "2015"
        },{
        "label": "2016"
        }
        ]
      }],
      "dataset": [{
        "seriesname": "iOS App Store",
        "data": [{
          "value": "125000"
        }, {
          "value": "300000"
        }, {
          "value": "480000"
        }, {
          "value": "800000"
        }, {
          "value": "1100000"
        }]
      }, {
        "seriesname": "Google Play Store",
        "data": [{
          "value": "70000"
        }, {
          "value": "150000"
        }, {
          "value": "350000"
        }, {
          "value": "600000"
        },{
          "value": "1400000"
        }]
      }, {
        "seriesname": "Amazon AppStore",
        "data": [{
          "value": "10000"
        }, {
          "value": "100000"
        }, {
          "value": "300000"
        }, {
          "value": "600000"
        },{
          "value": "900000"
        }]
      }]
    };
    $scope.dataPlotDragstart = function(event){
       startValue = event.data.startValue; 
    }
    $scope.dataPlotDragend = function(event){ 
      $scope.$apply(function(){
         $scope.selectedDataset = event.data.datasetName;
         $scope.selectedStartValue= FusionCharts.formatNumber(startValue);
         $scope.selectedEndValue = FusionCharts.formatNumber(event.data.endValue);
      });
    }

  });

}());