(function() {
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.when('/demos/ex32', {
        templateUrl: 'views/ex32.html',
        controller: 'ex32Controller'
      });
    }
  ]);

  var jsonify = res => res.json();
  var dataFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/annotating-single-data-point-data.json'
  ).then(jsonify);
  var schemaFetch = fetch(
    'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/annotating-single-data-point-schema.json'
  ).then(jsonify);

  app.controller('ex32Controller', function($scope, $rootScope) {
    $rootScope.demoId = 'ex32';
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
      dataMarker: [
        {
          seriesName: 'Interest Rate',
          time: 'Mar-1980',
          identifier: 'H',
          timeFormat: '%b-%Y',
          tooltext:
            'As a part of credit control program, under the leadership of Paul Volcker, the Fed tightened the money supply, allowing the federal fund rates to approach 20 percent.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Aug-1982',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext:
            'The FED eases off the monetary brakes, allowing interest rates to fall and the economy to begin a strong recovery.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Oct-1987',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext:
            'The FED is forced to ease rate after the stock market crash.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'May-1989',
          identifier: 'H',
          timeFormat: '%b-%Y',
          tooltext:
            'Liquidity problem forced the Fed to increase rate to nearly 10%.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Sept-1992',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext:
            'To fight the jobless economy growth the Fed had to reduce the interest rate to 3%.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Jun-2003',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext:
            'Struggling to revive the economy, the FED cuts it’s benchmark rate to 1%.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Sep-2007',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext: 'Fed started reducing the Federal Fund Rate.'
        },
        {
          seriesName: 'Interest Rate',
          time: 'Dec-2008',
          identifier: 'L',
          timeFormat: '%b-%Y',
          tooltext:
            'Fed reduced the interest rates to sub 0.25% to manage the menace of longest economic downturn since World War 2'
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
