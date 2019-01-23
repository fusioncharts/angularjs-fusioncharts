(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex27', {
        templateUrl: 'views/ex27.html',
        controller: 'ex27Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/column-line-combination-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/column-line-combination-schema.json'
  ).then(jsonify);

  app.controller('ex27Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex27';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      caption: {
        text: 'Web visits & downloads'
      },
      subcaption: {
        text: 'since 2015'
      },
      yAxis: [
        {
          plot: [
            {
              value: 'Downloads',
              type: 'column'
            },
            {
              value: 'Web Visits',
              type: 'line'
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
