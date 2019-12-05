# angularjs-fusioncharts

A simple and lightweight official AngularJS component for FusionCharts JavaScript charting library. angularjs-fusioncharts enables you to add JavaScript charts in your AngularJS application without any hassle.

## [Demo](https://fusioncharts.github.io/angularjs-fusioncharts/)

- Github Repo: [https://github.com/fusioncharts/angularjs-fusioncharts](https://github.com/fusioncharts/angularjs-fusioncharts)
- Documentation: [https://www.fusioncharts.com/dev/getting-started/angular/angularjs/your-first-chart-using-angularjs](https://www.fusioncharts.com/dev/getting-started/angular/angularjs/your-first-chart-using-angularjs)
- Support: [https://www.fusioncharts.com/contact-support](https://www.fusioncharts.com/contact-support)
- FusionCharts
  - Official Website: [https://www.fusioncharts.com/](https://www.fusioncharts.com/)
  - Official NPM Package: [https://www.npmjs.com/package/fusioncharts](https://www.npmjs.com/package/fusioncharts)
- Issues: [https://github.com/fusioncharts/angularjs-fusioncharts/issues](https://github.com/fusioncharts/angularjs-fusioncharts/issues)

---

## Table of Contents

- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Working with chart API](#working-with-apis)
  - [Working with events](#working-with-events)
- [Quick Start](#quick-start)
- [Going Beyond Charts](#going-beyond-charts)
- [Usage and Integration of FusionTime](#usage-and-integration-of-fusiontime)
- [Special note for IE Users](#special-note)
- [For Contributors](#for-contributors)
- [Licensing](#licensing)

## Getting Started

### Requirements

- **Node.js**, **NPM/Yarn** installed globally in your OS.
- You've an **AngularJS** Application.
- **FusionCharts** installed in your project, as detailed below:

### Installation

To install `angularjs-fusioncharts` library, run:

```bash
$ npm install angularjs-fusioncharts --save
```

To install `fusioncharts` library:

```bash
$ npm install fusioncharts --save
```

## Quick Start

#### Step 1: Include angular-fusioncharts.js and fusioncharts

In your index.html

```xml
  <script type="text/javascript" src="node_modules/fusioncharts/fusioncharts.js"></script>
  <script type="text/javascript" src="node_modules/fusioncharts/fusioncharts.charts.js"></script>
  <script type="text/javascript" src="node_modules/fusioncharts/themes/fusioncharts.theme.fusion.js"></script>
  <script type="text/javascript" src="node_modules/angular/angular.js"></script>
  <script type="text/javascript" src="node_modules/angularjs-fusioncharts/dist/angular-fusioncharts.js"></script>
```

### Step 2: Include ng-fusioncharts in your module

In the app, include ng-fusioncharts as a dependency. If you looking for where to add the dependency, look for the call to angular.module in your code.

```javascript
angular.module('myApp', ['ng-fusioncharts']);
```

### Step 3: Add the fusioncharts directive

In your HTML, find the section where you wish to add the chart and add a <div> with the fusioncharts directive. We are assuming it's inside a controller called MyController which would change based on your usage.

```xml
  <body ng-app='myApp'>
    ...
    <div  ng-controller="MyController">
      <div
        fusioncharts
        width="600"
        height="400"
        type="column2d"
        datasource="{{dataSource}}">
      </div>
    </div>
    ...
  </body>
```

### Step 4: Populate required variables in controller

In the previous code, we are binding to a scope variable myDataSource, but that hasn't been defined yet. In your controller, set the DataSource as you would for a regular FusionCharts JSON format DataSource ([see this](http://docs.fusioncharts.com/tutorial-getting-started-your-first-charts-building-your-first-chart.html) tutorial for a general introduction to this format).

```javascript
app.controller('MyController', function($scope) {
  $scope.dataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
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

// Initialize Charts with FusionCharts instance
Charts(FusionCharts);

var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', [
  '$scope',
  function($scope) {
    $scope.dataSource = {
      chart: {
        caption: 'Countries With Most Oil Reserves [2017-18]',
        subCaption: 'In MMbbl = One Million barrels',
        xAxisName: 'Country',
        yAxisName: 'Reserves (MMbbl)',
        numberSuffix: 'K'
      },
      data: [
        { label: 'Venezuela', value: '290' },
        { label: 'Saudi', value: '260' },
        { label: 'Canada', value: '180' },
        { label: 'Iran', value: '140' },
        { label: 'Russia', value: '115' },
        { label: 'UAE', value: '100' },
        { label: 'US', value: '30' },
        { label: 'China', value: '30' }
      ]
    };
  }
]);
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
        datasource="{{dataSource}}">
      </div>
    </div>
  </body>
</html>
```

Load it in browser , Chart should get displayed

## Working with Events

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

```js
var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope) {
  $scope.myDataSource = {
    chart: {
      caption: 'Countries With Most Oil Reserves [2017-18]',
      subCaption: 'In MMbbl = One Million barrels',
      xAxisName: 'Country',
      yAxisName: 'Reserves (MMbbl)',
      numberSuffix: 'K',
      theme: 'fusion'
    },
    data: [
      { label: 'Venezuela', value: '290' },
      { label: 'Saudi', value: '260' },
      { label: 'Canada', value: '180' },
      { label: 'Iran', value: '140' },
      { label: 'Russia', value: '115' },
      { label: 'UAE', value: '100' },
      { label: 'US', value: '30' },
      { label: 'China', value: '30' }
    ]
  };

  $scope.rollover = function(event, data) {
    console.log(event, data);
  };
});
```

Get the list of fusioncharts' [events](https://www.fusioncharts.com/dev/advanced-chart-configurations/events/classifying-events)

## Working with APIs

FusionCharts chart instance is made available from the `initialized` event. It provides the chart instance as a parameter which can be used to call FusionCharts methods.

In template, we add `initialized` event

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

```js
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

In the given above example, clicking the button changes the caption text to `Caption changed`

Get the list of fusioncharts' [methods](https://www.fusioncharts.com/dev/api/fusioncharts/fusioncharts-methods)

## Usage and integration of FusionTime

From `fusioncharts@3.13.3-sr.1` and `angularjs-fusioncharts@5.0.0`, You can visualize timeseries data easily with angular.

Learn more about FusionTime [here](https://www.fusioncharts.com/fusiontime).

### Sample code for FusionTime

If you've included angular-fusioncharts.js and fusioncharts in your `html`
then add the following `script` tag:

In your `index.html`

```xml
  ...
  <script type="text/javascript" src="node_modules/fusioncharts/fusioncharts.timeseries.js"></script>
  ...
```

In your `script.js`

```js
// If you haven't imported angulajs, angularjs-fusioncharts and fusioncharts in your html file and used require() syntax instead then add the following code from START to END:

// START
var angular = require('angular');
var FusionCharts = require('fusioncharts');
require('angularjs-fusioncharts');

// Require TimeSeries module
var TimeSeries = require('fusioncharts/fusioncharts.timeseries');

// Initialize Charts with FusionCharts instance
TimeSeries(FusionCharts);
var app = angular.module('myApp', ['ng-fusioncharts']);
// END

var jsonify = res => res.json();
var dataFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/data/line-chart-with-time-axis-data.json'
).then(jsonify);
var schemaFetch = fetch(
  'https://s3.eu-central-1.amazonaws.com/fusion.store/ft/schema/line-chart-with-time-axis-schema.json'
).then(jsonify);

var app = angular.module('myApp', ['ng-fusioncharts']);

app.controller('MyController', function($scope) {
  $scope.dataSource = {
    data: null,
    caption: {
      text: 'Sales Analysis'
    },
    subcaption: {
      text: 'Grocery'
    },
    yAxis: [
      {
        plot: {
          value: 'Grocery Sales Value',
          type: 'line'
        },
        format: {
          prefix: '$'
        },
        title: 'Sale Value'
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
```

Use a bundler like `browserify` to bundle the script  
See the installation docs [here](http://browserify.org/)

```bash
$ browserify script.js -o bundle.js
```

Again in your `index.html`

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
        type="timeseries"
        datasource-dt="dataSource">
        // When using TimeSeries pass your dataSource in "datasource-dt" attribute not in "datasource".
      </div>
    </div>
  </body>
</html>
```

**Important note :- If the chart's datasource has an instance of dataStore like in case of timeseries then you must use the new `datasource-dt` attribute for passing the data in html**

Useful links for FusionTime

- [How FusionTime works](https://www.fusioncharts.com/dev/fusiontime/getting-started/how-fusion-time-works)
- [Create your first chart](https://www.fusioncharts.com/dev/fusiontime/getting-started/create-your-first-chart-in-fusiontime)

## Special Note

If you want to support your application on IE(11 and below), then you need to take following steps:

### Firstly

You have to update your `angularjs-fusioncharts` and `fusioncharts` modules to latest versions. For `angularjs-fusioncharts` install `v5.0.1` and above; for `fusioncharts` install `v3.13.3-sr.1` and above.

### Secondly

In your template, modify your code like so,

```html
<div
  fusioncharts
  width="600"
  height="400"
  type="ANY_CHART_TYPE"
  datasource-dt="dataSource"
>
  // Instead of passing data in datasouce, use datasource-dt.
</div>
```

## For Contributors

- Clone the repository and install dependencies

```
$ git clone https://github.com/fusioncharts/angularjs-fusioncharts.git
$ cd angularjs-fusioncharts
$ npm i
$ npm run dev
```

## Going Beyond Charts

- Explore 20+ pre-built business specific dashboards for different industries like energy and manufacturing to business functions like sales, marketing and operations [here](https://www.fusioncharts.com/explore/dashboards).
- See [Data Stories](https://www.fusioncharts.com/explore/data-stories) built using FusionCharts’ interactive JavaScript visualizations and learn how to communicate real-world narratives through underlying data to tell compelling stories.

## Licensing

The FusionCharts React component is open-source and distributed under the terms of the MIT/X11 License. However, you will need to download and include FusionCharts library in your page separately, which has a [separate license](https://www.fusioncharts.com/buy).
