(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex34', {
        templateUrl: 'views/ex34.html',
        controller: 'ex34Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/date-range-event-overlay-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/date-range-event-overlay-schema.json'
  ).then(jsonify);

  app.controller('ex34Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex34';
    $rootScope.currentTitle = 'A Simple TimeSeries';
    $scope.themeName = 'fusion';
    $scope.myDataSource = {
      data: null,
      caption: {
        text: 'Interest Rate Analysis'
      },
      subCaption: {
        text: 'Federal Reserve (USA)'
      },
      yAxis: [
        {
          plot: 'Interest Rate',
          format: {
            suffix: '%'
          },
          title: 'Interest Rate'
        }
      ],
      xAxis: {
        plot: 'Time',
        timemarker: [
          {
            start: 'Jul-1981',
            end: 'Nov-1982',
            label:
              'Economic downturn was triggered by {br} tight monetary policy in an effort to {br} fight mounting inflation.',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Jul-1990',
            end: 'Mar-1991',
            label:
              'This eight month recession period {br} was characterized by a sluggish employment recovery, {br} most commonly referred to as a jobless recovery.',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Jun-2004',
            end: 'Jul-2006',
            label:
              'The Fed after raising interest rates {br} at 17 consecutive meetings, ends its campaign {br} to slow the economy and forestall inflation.',
            timeFormat: '%b-%Y'
          },
          {
            start: 'Dec-2007',
            end: 'Jun-2009',
            label:
              'Recession caused by the worst {br} collapse of financial system in recent {br} times.',
            timeFormat: '%b-%Y'
          }
        ]
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
