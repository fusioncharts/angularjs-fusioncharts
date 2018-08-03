var chartJSON = {
    "chart": {
        "caption": "Top Global Oil Reserves",
        "subCaption": "[2015-16]",
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
};

var jsonCode = CodeMirror(document.getElementById('chartCode'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript'
});

jsonCode.setValue(JSON.stringify(chartJSON, null, 2));

var step1command1 = CodeMirror(document.getElementById('c1'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript',
    viewportMargin: Infinity
});

step1command1.setValue("$ npm install react-fusioncharts --save");

var step1command2 = CodeMirror(document.getElementById('c2'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript',
    viewportMargin: Infinity
});

step1command2.setValue("$ npm install fusioncharts --save");

var step2command1 = CodeMirror(document.getElementById('c3'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript',
    viewportMargin: Infinity
}); 

step2command1.setValue("code goes here");


var step2command2 = CodeMirror(document.getElementById('c4'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript',
    viewportMargin: Infinity
}); 

step2command2.setValue("code goes here");

var step2command3 = CodeMirror(document.getElementById('c5'), {
    tabSize: "4",
    smartIndent: true,
    lineNumbers: true,
    readOnly: true,
    theme: 'dracula',
    mode: 'javascript'
}); 

//step2command3.setValue("code goes here");
step2command3.setValue(JSON.stringify(chartJSON, null, 2));

var modal = document.getElementById('myModal');
var btn = document.getElementById('mobileChart-selector');

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}