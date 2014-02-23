var fs = require('fs'),
    path = require('path');

module.exports = function autoInitRoutes(app) {
    fs.readdirSync(__dirname).forEach(function(fileName) {
        var name = path.basename(fileName, '.js');
        if (name !== 'index') {
            require('./' + name)(app);
        }
    });

};
