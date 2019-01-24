(function() {
  window.app = angular.module('fusioncharts-demo', [
    'ngRoute',
    'ng-fusioncharts',
    'ui.bootstrap',
    'ui.bootstrap.tpls',
    'ui.codemirror',
    'ngSanitize'
  ]);
  app.config([
    '$routeProvider',
    function($routeProvider) {
      $routeProvider.otherwise('/demos/ex1');
    }
  ]);

  var includeScript =
    '<script type="text/javascript" src="/path/to/fusioncharts.js"></script>\n<script type="text/javascript" src="/path/to/angular.js"></script>\n<script type="text/javascript" src="/path/to/angularjs-fusioncharts.js"></script>';
  var injectScript = 'angular.module("myApp", ["ng-fusioncharts"]);';
  var directiveUsage =
    '<div ng-controller="MyController">\n  <div \n    fusioncharts \n    width="600"\n    height="400"\n    type="column2d"\n    datasoure="myDataSource">\n  </div>\n</div>\n';
  var controllerCode =
    'app.controller(\'MyController\', function ($scope) {\n  $scope.myDataSource = {\n      "chart": {\n        "caption": "Countries With Most Oil Reserves [2017-18]",\n        "subCaption": "In MMbbl = One Million barrels",\n        "xAxisName": "Country",\n        "yAxisName": "Reserves (MMbbl)",\n        "numberSuffix": "K",\n        "theme": "fusion",\n      },\n      "data": [\n          { "label": "Venezuela", "value": "290" },\n          { "label": "Saudi", "value": "260" },\n          { "label": "Canada", "value": "180" },\n          { "label": "Iran", "value": "140" },\n          { "label": "Russia", "value": "115" },\n          { "label": "UAE", "value": "100" },\n          { "label": "US", "value": "30" },\n          { "label": "China", "value": "30"}\n      ]\n  };\n});';
  var fusiontimeCode =
    "// If you haven't imported angulajs, angularjs-fusioncharts and fusioncharts in your html file and used require() syntax instead then add the following code from START to END:\n\n// START\nvar angular = require('angular');\nvar FusionCharts = require('fusioncharts');\nrequire('angularjs-fusioncharts');\n\n// Require TimeSeries module\nvar TimeSeries = require('fusioncharts/fusioncharts.timeseries');\n\n// Initialize Charts with FusionCharts instance\nTimeSeries(FusionCharts);\nvar app = angular.module('myApp', ['ng-fusioncharts']);\n// END\n\nvar jsonify = res => res.json();\nvar dataFetch = fetch(\n  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/data.json'\n).then(jsonify);\nvar schemaFetch = fetch(\n  'https://raw.githubusercontent.com/fusioncharts/dev_centre_docs/fusiontime-beta-release/charts-resources/fusiontime/online-sales-single-series/schema.json'\n).then(jsonify);\n\nvar app = angular.module('myApp', ['ng-fusioncharts']);\n\napp.controller('MyController', function($scope) {\n  $scope.dataSource = {\n    caption: { text: 'Online Sales of a SuperStore in the US' },\n    data: null,\n    yAxis: [\n      {\n        plot: [\n          {\n            value: 'Sales ($)'\n          }\n        ]\n      }\n    ]\n  };\n\n  Promise.all([dataFetch, schemaFetch]).then(res => {\n    const data = res[0];\n    const schema = res[1];\n    const fusionTable = new FusionCharts.DataStore().createDataTable(\n      data,\n      schema\n    );\n    $scope.$apply(function() {\n      $scope.dataSource.data = fusionTable;\n    });\n  });\n});";
  var ftScriptTag =
    '<script type="text/javascript" src="/path/to/fusioncharts/fusioncharts.timeseries.js"></script>';
  var browserifyCode = '$ browserify script.js -o bundle.js';
  var fusionTimeHtml =
    '<html>\n  <head>\n    <!-- Include compiled bundle in script tag -->\n    <script type="text/javascript" src="./bundle.js"></script>\n  </head>\n\n  <body ng-app="myApp">\n    <div ng-controller="MyController">\n      <div\n        fusioncharts\n        width="600"\n        height="400"\n        type="timeseries"\n        datasource-dt="dataSource">\n        // When using TimeSeries pass your dataSource in "datasource-dt" attribute not in "datasource".\n      </div>\n    </div>\n  </body>\n</html>';

  app.controller('AppController', function($scope, $rootScope) {
    $scope.editorOptionsJs = {
      lineNumbers: true,
      theme: 'dracula',
      tabSize: '4',
      smartIndent: true,
      readOnly: true,
      mode: 'javascript'
    };
    $scope.editorOptionsHTML = {
      lineNumbers: true,
      theme: 'dracula',
      tabSize: '4',
      smartIndent: true,
      readOnly: true,
      mode: 'xml'
    };

    $scope.includeScript = includeScript;
    $scope.injectScript = injectScript;
    $scope.directiveUsage = directiveUsage;
    $scope.controllerCode = controllerCode;
    $scope.fusiontimeCode = fusiontimeCode;
    $scope.ftScriptTag = ftScriptTag;
    $scope.browserifyCode = browserifyCode;
    $scope.fusionTimeHtml = fusionTimeHtml;

    // Modal Controls
    $scope.modalClasses = 'show fade in';
    $scope.isModalOpen = false;

    $scope.toggleModal = function(status) {
      $scope.isModalOpen = status;
    };
  });
  app.controller('DemoController', function($scope, $routeParams, $rootScope) {
    setTimeout(function() {
      $scope.html = window.fcDemos[$rootScope.demoId].html;
      $scope.js = window.fcDemos[$rootScope.demoId].js;
      $scope.schema = window.fcDemos[$rootScope.demoId].schema;
      $scope.data = window.fcDemos[$rootScope.demoId].data;
    });

    setTimeout(function() {
      $rootScope.$watch('demoId', function(newVal) {
        $scope.html = window.fcDemos[newVal].html;
        $scope.js = window.fcDemos[newVal].js;
        $scope.schema = window.fcDemos[newVal].schema;
        $scope.data = window.fcDemos[newVal].data;
        setTimeout(function() {
          Prism.highlightAll();
        });
      });
    });
  });

  app.directive('ngPrism', [
    '$interpolate',
    function($interpolate) {
      'use strict';
      return {
        restrict: 'E',
        template: '<pre><code ng-transclude></code></pre>',
        replace: true,
        transclude: true
      };
    }
  ]);

  app.directive('tabbedCode', function($rootScope) {
    return {
      restrict: 'E',
      scope: true,
      template:
        '\
            <div class="code-view mt-2">\
                <div class="card-shadow" style="background: #03040B;">\
                    <div class="code-nav-btns btn-group" role="group" aria-label="Basic example">\
                        <button type="button" class="btn btn-code selected" id="html">HTML</button>\
                        <button type="button" class="btn btn-code" id="js">JavaScript</button>\
                        <button type="button" class="btn btn-code hide" id="schema">Schema</button>\
                        <button type="button" class="btn btn-code hide" id="data">Data</button>\
                    </div>\
                    <div class="card-body p-0">\
                        <div class="code-panel">\
                            <div class="code-panel-header">\
                                <div id="chartCode">\
                                    <div ui-codemirror ui-codemirror-opts="editorOptionsHTML" ng-model="html" ng-if="activated === \'html\'"></div>\
                                    <div ui-codemirror ui-codemirror-opts="editorOptionsJs" ng-model="js" ng-if="activated === \'js\'"></div>\
                                    <div ui-codemirror ui-codemirror-opts="editorOptionsJs" ng-model="schema" ng-if="activated === \'schema\'"></div>\
                                    <div ui-codemirror ui-codemirror-opts="editorOptionsJs" ng-model="data" ng-if="activated === \'data\'"></div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>',
      link: function(scope, element, attr) {
        if (attr.obj === 'true') {
          element.find('#schema').removeClass('hide');
          element.find('#data').removeClass('hide');
        } else {
          element.find('#schema').addClass('hide');
          element.find('#data').addClass('hide');
        }

        scope.activated = 'html';
        scope.editorOptionsJs = {
          lineNumbers: true,
          theme: 'dracula',
          tabSize: '4',
          smartIndent: true,
          readOnly: true,
          mode: 'javascript'
        };
        scope.editorOptionsHTML = {
          lineNumbers: true,
          theme: 'dracula',
          tabSize: '4',
          smartIndent: true,
          readOnly: true,
          mode: 'xml'
        };

        function removeAllSelected() {
          element.find('#html').removeClass('selected');
          element.find('#js').removeClass('selected');
          element.find('#schema').removeClass('selected');
          element.find('#data').removeClass('selected');
        }
        function addSelectedClass(id) {
          element.find('#' + id).addClass('selected');
        }

        element.find('#html').on('click', function() {
          removeAllSelected();
          scope.activated = 'html';
          addSelectedClass(scope.activated);
          scope.$digest();
        });

        element.find('#js').on('click', function() {
          removeAllSelected();
          scope.activated = 'js';
          addSelectedClass(scope.activated);
          scope.$digest();
        });

        element.find('#schema').on('click', function() {
          removeAllSelected();
          scope.activated = 'schema';
          addSelectedClass(scope.activated);
          scope.$digest();
        });

        element.find('#data').on('click', function() {
          removeAllSelected();
          scope.activated = 'data';
          addSelectedClass(scope.activated);
          scope.$digest();
        });

        setTimeout(function() {
          removeAllSelected();
          addSelectedClass(scope.activated);
          scope.$digest();
        }, 1000);
      }
    };
  });
})();
