var persist = require('persist'),
    events = require('events');

var Schema = function (p) {
    this.persist = p || persist;
    this.types = this.persist.type;
    this.models = {};
};

Schema.types = persist.type;

Schema.eventEmmiter = new events.EventEmitter();
for (var n in events.EventEmitter.prototype) {
    Schema[n] = events.EventEmitter.prototype[n];
}

Schema.on('define', function (model) {
    model.create = function (connection, values, callback) {
        if (!callback) callback = function () {
        };
        var obj = new model(values);
        obj.save(connection, callback);
        return obj;
    };

    model.prototype.values = function () {
        var values = {};
        for (var col in model.columns) {
            values[col] = this[col];
        }
        return values;
    };
});

Schema.prototype.define = function (name, columnDefs, opts) {
    var model = this.persist.define(name, columnDefs, opts);
    Schema.emit('define', model);
    this.models[name] = model;
    return model;
};


Schema.prototype.defineAuto = function (name, options, callback) {
    var self = this;
    this.persist.defineAuto(name, options, function (err, model) {
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
