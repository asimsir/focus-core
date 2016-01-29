var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

var babelOptions = {
    presets: [
        "stage-0",
        "react",
        "es2015"
    ],
    plugins: [
        "transform-class-properties",
        "transform-decorators-legacy",
        "add-module-exports"
    ],
    sourceMaps: 'inline'
}

var walk = function(dir) {
    var files = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) files = files.concat(walk(file));
        else files.push(file);
    });
    return files;
};

var filterFiles = function(files) {
    return files.filter(function(file) {
        return (!file.match(/(example|__tests__)/) && file.match(/\.js$/));
    });
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

var files = filterFiles(walk('./src'));
files.forEach(function(file) {
    babel.transformFile(file, babelOptions, function(err, result) {
        if (err) console.error(err);
		//Copie des fichiers 
        var newFile = file.replace('./src', '../Portail.Prive/node_modules/focus-core');
        ensureDirectoryExistence(newFile);
        fs.writeFile(newFile, result.code, function(err) {
            if (err) console.error(err);
            console.log('Babelified Prive' + file);
        });
		
		var newFilePublic = file.replace('./src', '../Portail.Public/node_modules/focus-core');
        ensureDirectoryExistence(newFilePublic);
        fs.writeFile(newFilePublic, result.code, function(err) {
            if (err) console.error(err);
            console.log('Babelified Public' + file);
        });

    });
});
