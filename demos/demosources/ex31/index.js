(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex31', {
        templateUrl: 'views/ex31.html',
        controller: 'ex31Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/candlestick-chart-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/candlestick-chart-schema.json'
  ).then(jsonify);

  app.controller('ex31Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex31';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      caption: {
        text: 'Apple Inc. Stock Price'
      },
      yAxis: {
        plot: {
          open: 'Open',
          high: 'High',
          low: 'Low',
          close: 'Close',
          type: 'candlestick'
        },
        title: 'Value'
      }
    };

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      $scope.$apply(function() {
        $scope.myDataSource.data = fusionTable;
      });
    });
  });
})();
