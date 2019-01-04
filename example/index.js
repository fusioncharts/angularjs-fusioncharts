var jsonify = res => res.json();
var dataFetch = fetch(
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json'
).then(jsonify);

var app = angular.module('myApp', ['ng-fusioncharts']);

function getData() {
  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    fusionTable = new FusionCharts.DataStore().createDataTable(data, schema);
    console.log('Done');
    app.controller('MyController', function($scope) {
      $scope.timeSeriesDS.data = fusionTable;
      $scope.$apply();
    });
  });
}

app.controller('MyController', function($scope) {
  $scope.timeSeriesDS = {
    caption: { text: 'Online Sales of a SuperStore in the US' },
    data: null,
    yAxis: [
      {
        plot: [
          {
            value: 'Sales ($)'
          }
        ]
      }
    ]
  };

  $scope.columnDS = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  };

  $scope.update = function() {
    $scope.timeSeriesDS.caption.text = 'Something Else';
    $scope.columnDS.chart.caption = 'Something Else';
  };

  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    );
    $scope.timeSeriesDS.data = fusionTable;
    $scope.$apply();
  });
});

// getData();
