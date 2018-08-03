FusionCharts.ready(function() {
    var demoChart = new FusionCharts({
      type: 'column2d',
      renderAt: 'chart-container',
      width: '100%',
      height: '400',
      dataFormat: 'json',
      dataSource: {
        "chart": {
          "caption": "Top Global Oil Reserves",
          "subCaption":"[2015-16]",
          "xAxisName": "MMbbl= One Million barrels",
          "yAxisName": "Reserves (MMbbl)",  
          "numberSuffix": "K",
          "showValues": "0",
          "theme": "fusion"
        },
        "data": [{
          "label": "Venezuela",
          "value": "290"
        }, {
          "label": "Saudi",
          "value": "260"
        }, {
          "label": "Canada",
          "value": "180"
        }, {
          "label": "Iran",
          "value": "140"
        }, {
          "label": "Russia",
          "value": "115"
        }, {
          "label": "UAE",
          "value": "100"
        }, {
          "label": "US",
          "value": "30"
        }, {
          "label": "China",
          "value": "30"
        }]
      }
    }).render();
  });