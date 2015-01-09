var fs = require('fs');
var path = require('path');
var ejs = require('ejs');
module.exports = function (grunt) {
    var demosRoot = "./demos/demosources";
    var demosList = fs.readdirSync (demosRoot);
    
    
    grunt.task.registerMultiTask('makeDemos', 'Makes the Demo Browser app', function () {
        var options = this.options({

        });
        var mainTemplate = grunt.file.read('./demos/src/' + options.mainTemplate);
        var codeboxTemplate = grunt.file.read('./demos/src/codebox.ejs');

        var demosMeta = [];
        grunt.file.mkdir (options.out + '/js/demos');
        grunt.file.mkdir (options.out + '/views');
        grunt.file.mkdir (options.out + '/data');

        for(var i=0; i<demosList.length; i++) {
            var config = JSON.parse(grunt.file.read (path.join(demosRoot, demosList[i] + '/config.json'), 'utf-8'));
            var viewTemplate = grunt.file.read (path.join(demosRoot, demosList[i] + '/src.ejs'), 'utf-8');
            var htmlView = ejs.render (viewTemplate, {src: 'html'});
            var jsView = ejs.render (viewTemplate, {src: 'js'});
            var jsSrc = grunt.file.read (path.join(demosRoot, demosList[i] + '/index.js'), 'utf-8');
            var htmlSrc = grunt.file.read (path.join(demosRoot, demosList[i] + '/index.html'), 'utf-8') + codeboxTemplate;
            demosMeta.push({
                script: 'js/demos/' + demosList[i] + '.js',
                jsCode: JSON.stringify(jsView),
                htmlCode: JSON.stringify(htmlView),
                title: config.title,
                desc: config.desc,
                id: demosList[i]
            });
            grunt.file.write (path.join (options.out + '/js/demos', '/' + demosList[i] + '.js'), jsSrc);
            grunt.file.write (path.join (options.out + '/views', '/' + demosList[i] + '.html'), htmlSrc);
        }
        grunt.file.copy ('./demos/src/data.json', options.out + '/data/data.json');
        grunt.file.copy ('./demos/src/data.xml', options.out + '/data/data.xml');
        var mainHTML = ejs.render (mainTemplate, {demos: demosMeta});
        grunt.file.write (options.out + '/index.html' ,mainHTML);
    });
};
    