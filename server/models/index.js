var fs = require('fs'),
    path = require('path');

fs.readdirSync(__dirname).forEach(function(filename) {
    var name = path.basename(filename, '.js');
    if (name === 'index') {
        return;
    }

    function load() {
        return require("./" + name);
    }

    module.exports.__defineGetter__(capitalizeFirstLetter(name), load);
});

//Export it by the capitalized name because that's how mongoose is framed
function capitalizeFirstLetter(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}