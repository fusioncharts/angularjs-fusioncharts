(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex30', {
        templateUrl: 'views/ex30.html',
        controller: 'ex30Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/area-chart-with-time-axis-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/area-chart-with-time-axis-schema.json'
  ).then(jsonify);

  app.controller('ex30Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex30';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      chart: {
        showLegend: 0
      },
      caption: {
        text: 'Daily Visitors Count of a Website'
      },
      yAxis: [
        {
          plot: {
            value: 'Daily Visitors',
            type: 'area'
          },
          title: 'Daily Visitors (in thousand)'
        }
      ]
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
