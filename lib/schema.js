var persist = require('persist');

var Schema = function(p) {
    this.persist = p || persist;
    this.types = p.type;
    this.models = {};
};

Schema.types = persist.type;

Schema.prototype.define = function(name, columnDefs, opts) {
    var model = this.persist.define(name, columnDefs, opts);
    this.models[name] = model;
    return model;
};

Schema.prototype.defineAuto = function(name, options, callback) {
    var self = this;
    this.persist.defineAuto(name, options, function(err, model) {
        if (!err) self.models[name] = model;
        callback(err, model);
    });
};

Schema.prototype.model = function (model, caseSensitive) {
    if (!caseSensitive) {
        model = model.toLowerCase();
    }
    var foundModel;
    for (var i in this.models) {
        if (model === i || !caseSensitive && model === i.toLowerCase()) {
            foundModel = this.models[i];
        }
    }
    return foundModel;
};

module.exports = exports = Schema;
