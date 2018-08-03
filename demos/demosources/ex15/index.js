(function () {
  app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/demos/ex15', {
      templateUrl: 'views/ex15.html',
      controller: 'ex15Controller'
    });
  }]);




  app.controller('ex15Controller', function ($scope, $rootScope) {
    $rootScope.demoId = 'ex15';
    var vm = this;
    $rootScope.currentTitle = 'Export multiple charts';        

    $scope.firstDataSource  = {
      "chart": {
        "caption": "Countries With Most Oil Reserves [2017-18]",
        "subCaption": "In MMbbl = One Million barrels",
        "xAxisName": "Country",
        "yAxisName": "Reserves (MMbbl)",
        "numberSuffix": "K",
        "theme": "fusion",
      },
      "data": [{
        "label": "Venezuela",
        "value": "290"
      }, {
        "label": "Saudi",
        "value": "260"
      }, {
        "label": "Canada",
        "value": "180"
      }, {
        "label": "Iran",
        "value": "140"
      }, {
        "label": "Russia",
        "value": "115"
      }, {
        "label": "UAE",
        "value": "100"
      }, {
        "label": "US",
        "value": "30"
      }, {
        "label": "China",
        "value": "30"
      }]
    };

    $scope.secondDataSource  = {
      chart: {
        caption: "Yearly Energy Production Rate",
        subCaption: " Top 5 Developed Countries",
        numbersuffix: " TWh",
        showSum: "1",
        plotToolText:
          "$label produces <b>$dataValue</b> of energy from $seriesName",
        theme: "fusion"
      },
      categories: [
        {
          category: [
            {
              label: "Canada"
            },
            {
              label: "China"
            },
            {
              label: "Russia"
            },
            {
              label: "Australia"
            },
            {
              label: "United States"
            },
            {
              label: "France"
            }
          ]
        }
      ],
      dataSet: [
        {
          seriesName: "Coal",
          data: [
            {
              value: "400"
            },
            {
              value: "830"
            },
            {
              value: "500"
            },
            {
              value: "420"
            },
            {
              value: "790"
            },
            {
              value: "380"
            }
          ]
        },
        {
          seriesName: "Hydro",
          data: [
            {
              value: "350"
            },
            {
              value: "620"
            },
            {
              value: "410"
            },
            {
              value: "370"
            },
            {
              value: "720"
            },
            {
              value: "310"
            }
          ]
        },
        {
          seriesName: "Nuclear",
          data: [
            {
              value: "210"
            },
            {
              value: "400"
            },
            {
              value: "450"
            },
            {
              value: "180"
            },
            {
              value: "570"
            },
            {
              value: "270"
            }
          ]
        },
        {
          seriesName: "Gas",
          data: [
            {
              value: "180"
            },
            {
              value: "330"
            },
            {
              value: "230"
            },
            {
              value: "160"
            },
            {
              value: "440"
            },
            {
              value: "350"
            }
          ]
        },
        {
          seriesName: "Oil",
          data: [
            {
              value: "60"
            },
            {
              value: "200"
            },
            {
              value: "200"
            },
            {
              value: "50"
            },
            {
              value: "230"
            },
            {
              value: "150"
            }
          ]
        }
      ]
    };


    $scope.exportChart = function(){
      FusionCharts.batchExport({
        exportFormat:'pdf'
      })
    }
    // $scope.myDataSource = DataSource;


  });

}());