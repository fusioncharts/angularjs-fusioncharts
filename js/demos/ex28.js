(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex28', {
        templateUrl: 'views/ex28.html',
        controller: 'ex28Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/plotting-two-variable-measures-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/plotting-two-variable-measures-schema.json'
  ).then(jsonify);

  app.controller('ex28Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex28';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      caption: {
        text: 'Cariaco Basin Sampling'
      },
      subcaption: {
        text: 'Analysis of O₂ Concentration and Surface Temperature'
      },
      yAxis: [
        {
          plot: 'O2 concentration',
          min: '3',
          max: '6',
          title: 'O₂ Concentration (mg/L)'
        },
        {
          plot: 'Surface Temperature',
          min: '18',
          max: '30',
          title: 'Surface Temperature (°C)'
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
