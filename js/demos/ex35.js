(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex35', {
        templateUrl: 'views/ex35.html',
        controller: 'ex35Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/adding-a-reference-line-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/adding-a-reference-line-schema.json'
  ).then(jsonify);

  app.controller('ex35Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex35';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      caption: {
        text: 'Temperature readings in Italy'
      },
      yAxis: [
        {
          plot: 'Temperature',
          title: 'Temperature',
          format: {
            suffix: '°C'
          },
          style: {
            title: {
              'font-size': '14px'
            }
          },
          referenceLine: [
            {
              label: 'Controlled Temperature',
              value: '10'
            }
          ]
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
