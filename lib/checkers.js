
var Checkable = require('./model');

var defaultMessages = {
    uniqueness: 'is not unique'
};

function errormsg(checker, attr, msg) {
    if (msg) return msg;
    return "'" + attr + "' " + defaultMessages[checker];
}

Checkable.checkUniqueness = function(connection, attr, value, msg, cb) {
    var Model = this;
    if (!cb && typeof msg === 'function') {
        cb = msg;
        msg = null;
    }
    var cond = {};
    cond[attr] = value;
    Model.where(cond).all(connection, function (error, found) {
        if (found.length >= 1) {
            return cb(errormsg('uniqueness', attr, msg));
        }
        return cb(null);
    });
};