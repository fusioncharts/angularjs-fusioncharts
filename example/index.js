var jsonify = res => res.json();
var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope) {
  $scope.timeSeriesDS = {
    data: null,
    caption: {
      text: 'Sales Analysis'
    },
    subcaption: {
      text: 'Grocery'
    },
    yAxis: [
      {
        plot: {
          value: 'Grocery Sales Value',
          type: 'line'
        },
        format: {
          prefix: '$'
        },
        title: 'Sale Value'
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
    $scope.columnDS.data[1].value = '340';
  };

  Promise.all([dataFetch, schemaFetch]).then(res => {
    const data = res[0];
    const schema = res[1];
    const fusionTable = new FusionCharts.DataStore().createDataTable(
      data,
      schema
    );
    $scope.$apply(function() {
      $scope.timeSeriesDS.data = fusionTable;
    });
  });
});

// getData();
