# angularjs-fusioncharts

Simple and effective AngularJS charts plugin for FusionCharts.

### Details
Use this AngularJS charts plugin to add interactive charts to your web and mobile applications using just a single directive. Choose from 90+ charts & 900+ maps from FusionCharts' core [JavaScript charts](http://www.fusioncharts.com/) library.

 You can access all the rich charting features like events, annotations, macros, themes, image-export etc. to make your visualizations stand-out.

 ### Installation
 

 Install fusioncharts library
 ```bash
 $ npm install fusioncharts --save
 ```  
 Alternatively you can use downloaded fusioncharts files.


 Install angular 1.x.x 
 ```bash
 # Any angular 1.x version is compatible
 $ npm install angular@1.7.2 --save 
 ```
 
 Install angularjs-fusioncharts module
 ```bash
 $ npm install angularjs-fusioncharts --save
 ```
 Alternatively you can use downloaded angularjs-fusioncharts wrapper.
 

### Demos
To learn what you can do using this Angular charts plugin, explore some [live demos](http://www.fusioncharts.com/angularjs-charts/).

### Usage
#### Step 1: Include angular-fusioncharts.js and fusioncharts
In your index.html
```xml
  <script type="text/javascript" src="node_modules/fusioncharts/fusioncharts.js"></script>
  <script type="text/javascript" src="node_modules/fusioncharts/themes/fusioncharts.theme.fusion.js"></script>
  <script type="text/javascript" src="node_modules/angular/angular.js"></script>
  <script type="text/javascript" src="node_modules/angularjs-fusioncharts/dist/angular-fusioncharts.js"></script>
```

### Step 2: Include ng-fusioncharts in your module
In the app, include ng-fusioncharts as a dependency. If you looking for where to add the dependency, look for the call to angular.module in your code.

```javascript
angular.module("myApp", ["ng-fusioncharts"]);
```

### Step 3: Add the fusioncharts directive
In your HTML, find the section where you wish to add the chart and add a <div> with the fusioncharts directive. We are assuming it's inside a controller called MyController which would change based on your usage.

```xml
  <div ng-controller="MyController">
    <div
      fusioncharts
      width="600"
      height="400"
      type="column2d"
      datasource="{{myDataSource}}">
    </div>
  </div>
```

### Step 4:Populate required variables in controller
In the previous code, we are binding to a scope variable myDataSource, but that hasn't been defined yet. In your controller, set the DataSource as you would for a regular FusionCharts JSON format DataSource ([see this](http://docs.fusioncharts.com/tutorial-getting-started-your-first-charts-building-your-first-chart.html) tutorial for a general introduction to this format).


```javascript
app.controller('MyController', function($scope){
  $scope.dataSource = {
    "chart": {
      "caption": "Countries With Most Oil Reserves [2017-18]",
      "subCaption": "In MMbbl = One Million barrels",
      "xAxisName": "Country",
      "yAxisName": "Reserves (MMbbl)",
      "numberSuffix": "K",
      "theme": "fusion"
    },
    "data": [
      { "label": "Venezuela", "value": "290" },
      { "label": "Saudi", "value": "260" },
      { "label": "Canada", "value": "180" },
      { "label": "Iran", "value": "140" },
      { "label": "Russia", "value": "115" },
      { "label": "UAE", "value": "100" },
      { "label": "US", "value": "30" },
      { "label": "China", "value": "30" }
    ]
  };

});
```
And your chart should display when you load the page.

### Using `require()` syntax
In script.js
```javascript
//  Require AngularJS 
var angular = require('angular');

// Require FusionCharts 
var FusionCharts = require('fusioncharts');

// Include angularjs-fusioncharts 
require('angularjs-fusioncharts');

// Require Chart modules 
var Charts = require('fusioncharts/fusioncharts.charts');

// Require Fusion theme
var FusionTheme = require('fusioncharts/themes/fusioncharts.theme.fusion');

// Initialize Charts with FusionCharts instance
Charts(FusionCharts);

// Initialize FusionTheme with FusionCharts instance
FusionTheme(FusionCharts);

var app = angular.module('myApp', [ 'ng-fusioncharts' ]);

app.controller('MyController', ['$scope', function($scope) {
  $scope.dataSource = {
    "chart": {
      "caption": "Countries With Most Oil Reserves [2017-18]",
      "subCaption": "In MMbbl = One Million barrels",
      "xAxisName": "Country",
      "yAxisName": "Reserves (MMbbl)",
      "numberSuffix": "K",
      "theme": "fusion"
    },
    "data": [
      { "label": "Venezuela", "value": "290" },
      { "label": "Saudi", "value": "260" },
      { "label": "Canada", "value": "180" },
      { "label": "Iran", "value": "140" },
      { "label": "Russia", "value": "115" },
      { "label": "UAE", "value": "100" },
      { "label": "US", "value": "30" },
      { "label": "China", "value": "30" }
    ]
  };
}]);
```
Use a bundler like `browserify` to bundle the script   
See the installation docs [here](http://browserify.org/)

```bash
$ browserify script.js -o bundle.js
```
In `index.html`
```xml
<html>
  <head>

    <!-- Include compiled bundle in script tag -->
    <script type="text/javascript" src="./bundle.js"></script>
  </head>

  <body ng-app="myApp">
    <div ng-controller="MyController">
      <div
        fusioncharts
        width="600"
        height="400"
        type="column2d"
        datasource="{{myDataSource}}">
      </div>
    </div>
  </body>
</html>


```
Load  it in browser , Chart should get displayed

### Listening to events

Fusincharts events can be subscribed by attaching scope functions to event attributes.
All the events attributes start with `fcevent-`
followed by the event name in lowercase  

Usage in template :

```xml
<fusioncharts 
  width="400"
  height="400"
  type="column2d"
  datasource="{{myDataSource}}"
  fcevent-dataplotrollover="rollover(event, args)">
</fusioncharts>
```
In the given above template, `rollover` is the scope function that needs to be defined in the controller's code.

For more on this read [here](https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-events)

```
var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope){
    $scope.myDataSource = {
        "chart": {
          "caption": "Countries With Most Oil Reserves [2017-18]",
          "subCaption": "In MMbbl = One Million barrels",
          "xAxisName": "Country",
          "yAxisName": "Reserves (MMbbl)",
          "numberSuffix": "K",
          "theme": "fusion"
        },
        "data": [
          { "label": "Venezuela", "value": "290" },
          { "label": "Saudi", "value": "260" },
          { "label": "Canada", "value": "180" },
          { "label": "Iran", "value": "140" },
          { "label": "Russia", "value": "115" },
          { "label": "UAE", "value": "100" },
          { "label": "US", "value": "30" },
          { "label": "China", "value": "30" }
        ]
      };

      $scope.rollover = function(event, name){
          console.log(event, name);
      }
});
```

Get the list of fusioncharts' [events](https://www.fusioncharts.com/dev/advanced-chart-configurations/events/classifying-events)

### Chart API

FusionCharts chart instance is made available from the ```initialized``` event. It provides the chart instance as a parameter which can be used to call FusionCharts methods.

In template, we add ```initialized``` event

```xml
<fusioncharts
  width="400"
  height="400"
  type="column2d"
  datasource="{{myDataSource}}"
  initialized="onInitialized(chart)">
</fusioncharts>
<button ng-click="changeCaption()">Change Chart Caption</button>
```

In order to use the chart instance, we need to store it.

```
var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope){
    var chart; 
    $scope.datasource = {
       ...// same data as above
      };

      $scope.onInitialized = function(chartObj){
        chart = chartObj;
      }

      $scope.changeCaption = function(){
          chart.setChartAttribute('caption', 'Caption changed');
      }
});
```
In the given above example, clicking the button changes the caption text to ```Caption changed```

Get the list of fusioncharts' [methods](https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods)


### Tutorial

Following tutorials will help you get started:

- Tutorial by a user of this plugin: [How to Build Charts in Angular](https://davidwalsh.name/angular-charts)

### Documentation
To dive deeper, please view the [official documentation](http://www.fusioncharts.com/dev/using-with-javascript-libraries/angularjs/introduction.html).


### Features

 - Add a chart using just a single directive.
 - Auto-updates your chart object on modifying scope.
 - Angular-friendly events let you call controller functions directly from the chart.
 - Offers advanced control by giving you access to full FusionCharts object.
 - Has variety of ways to add a chart, from JSON URL to Scope Array Binding.
 - Plenty of examples and good documentation.
