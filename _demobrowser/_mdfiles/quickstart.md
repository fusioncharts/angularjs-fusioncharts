## QuickStart

### Step 1: Include angular-fusioncharts.js

In your HTML, include `angular-fusioncharts.js` after all other scripts:

```
<script type="text/javascript" src="/path/to/fusioncharts.js"></script>
<script type="text/javascript" src="/path/to/angular.js"></script>
<script type="text/javascript" src="/path/to/angular-fusioncharts.js"></script>
```

### Step 2: Include `ng-fusioncharts` in your module

In the app, include `ng-fusioncharts` as a dependency. If you looking for where to add the dependency, look for the call to `angular.module` in your code.

```
angular.module("myApp", ["ng-fusioncharts"])
```

### Step 3: Add the `fc-chart` directive

In your HTML, find the section where you wish to add the chart and add a `<div>` with the `fc-chart` directive. We are assuming it's inside a controller called `MyController` which would change based on your usage.

```
<div ng-controller="MyController">
  <div fc-chart
       fc-width="600"
       fc-height="400"
       fc-type="column2d"
       fc-dataSource="{{ myDataSource }}" >
  </div>
</div>
```

Now this is bound to a datasource with the `myDataSource` scope object.

### Step 4: Populate required variables in controller

In the previous code, we are binding to a scope variable `myDataSource`, but that hasn't been defined yet.

In your controller, set the DataSource as you would for a regular FusionCharts JSON Format DataSource (see [this tutorial](http://docs.fusioncharts.com/tutorial-getting-started-your-first-charts-building-your-first-chart.html) for a general introduction to this format).

```
app.controller('MyController', function ($scope) {
  $scope.myDataSource = {
    chart: {
        caption: "Harry's SuperMart",
        subCaption: "Top 5 stores in last month by revenue",
    },
    data:[{
        label: "Bakersfield Central",
        value: "880000"
    },
    {
        label: "Garden Groove harbour",
        value: "730000"
    },
    {
        label: "Los Angeles Topanga",
        value: "590000"
    },
    {
        label: "Compton-Rancho Dom",
        value: "520000"
    },
    {
        label: "Daly City Serramonte",
        value: "330000"
    }]
  };
});
```

And your chart should display when you load the page. 

### Licensing

Angular-FusionCharts is open-source and distributed under the terms of the MIT/X11 License. You will still need to download and include FusionCharts in your page. This project provides no direct functionality. You can <a href="http://fusioncharts.com/download/">Download an evaluation</a>. You will still need to purchase a FusionCharts license to use in a commercial environment (FusionCharts is [free for non-commercial and personal use](http://www.fusioncharts.com/download/free/)) .
