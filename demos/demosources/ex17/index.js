(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex17', {
      templateUrl: 'views/ex17.html',
      controller: 'ex17Controller'
    });
  }]);




  app.controller('ex17Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex17';
    var vm = this,
    datasetName,
    startValue,
    endValue;
    $rootScope.currentTitle = 'Special Events';        
    $scope.myDataSource = {
      "chart": {
        "caption": "Android and iOS Devices Sales Projections",
        "subCaption": "Drag the top of columns to adjust projections for 2017 & 2018",
        "numberPrefix": "$",
        "numberSuffix": "M",
        "yaxismaxvalue": "200",
        "theme": "fusion",
        "plotToolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
      },
      "categories": [{
        "category": [{
          "label": "2014",
          "fontItalic": "0"
        }, {
          "label": "2015",
          "fontItalic": "0"
        }, {
          "label": "2016",
          "fontItalic": "0"
        }, {
          "label": "2017 (Projected)"
        }, {
          "label": "2018 (Projected)"
        }]
      }],
      "dataset": [{
        "seriesname": "Android Devices",
        "data": [{
          "value": "73",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "80",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "97",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "110",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }, {
          "value": "180",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }]
      }, {
        "seriesname": "iOS Devices",
        "data": [{
          "value": "63.2",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "68",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "82",
          "alpha": "100",
          "allowDrag": "0"
        }, {
          "value": "99",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }, {
          "value": "150",
          "toolText": "<b>$label</b><br>$seriesName: <b>$dataValue</b>"
        }]
      }]
    };
    $scope.message = 'Drag any column for years 2017 or 2018 to see updated value along with the label'; 
    $scope.dataPlotDragstart = function(event){
       startValue = FusionCharts.formatNumber(event.data.startValue, {
                      "decimals": "2",
                      "numberPrefix": "$",
                      "numberSuffix": "M"
                     });;     
    }
    $scope.dataPlotDragend = function(event){ 
      $scope.$apply(function(){
         datasetName = event.data.datasetName;
         endValue = FusionCharts.formatNumber(event.data.endValue,{
              "decimals": "2",
              "numberPrefix": "$",
              "numberSuffix": "M"
         });
         $scope.message = `<b>${datasetName}</b> is modified to <b>${endValue}</b> from <b>${startValue}</b>`;
      });
    }

  });

}());