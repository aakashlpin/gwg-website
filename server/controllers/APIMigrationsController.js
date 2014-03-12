var models = require('../models');

module.exports = {
    assignUserNames: function(req, res) {
        var GuruModel = models.Guru;
        GuruModel.migrationAssignUserName(function(err) {
            if (!err) {
                res.json({status: 'migration success'});
            } else {
                res.json({status: 'migration failed'})
            }
        })

    }
};