(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex25', {
        templateUrl: 'views/ex25.html',
        controller: 'ex25Controller'
      });
    }
  ]);

  var FusionCharts = require('fusioncharts');

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
  ).then(jsonify);

  app.controller('ex25Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex25';
    $rootScope.currentTitle = 'Update chart attribute through methods';
    $scope.myDataSource = {
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

    Promise.all([dataFetch, schemaFetch]).then(res => {
      const data = res[0];
      const schema = res[1];
      const fusionTable = new FusionCharts.DataStore().createDataTable(
        data,
        schema
      );
      $scope.$apply(function() {
        $scope.dataSource.data = fusionTable;
      });
    });
  });
})();
