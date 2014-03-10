var fs = require('fs'),
    path = require('path');

module.exports = function autoInitRoutes(app) {
    fs.readdirSync(__dirname).forEach(function(fileName) {
        var name = path.basename(fileName, '.js');
        //ignore all the Api files
        if (name !== 'index' && name.indexOf('Api') !== 0) {
            require('./' + name)(app);
        }

        //finally include the API aggregator
        require('./ApiRoutersAggregator')(app);
    });

};
