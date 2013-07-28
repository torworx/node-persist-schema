var events = require('events'),

    ModelClass = require('./model');

var Schema = function (p, settings) {
    if (!settings && p && !p.define) settings = p;
    if (!p || !p.define) p = require('persist');
    this.persist = p;
    this.settings = settings;
    this.types = this.persist.type;
    this.models = {};

    this.connect(function (err, connection) {
        this.connection = connection;
    });
};

Schema.types = persist.type;

Schema.eventEmmiter = new events.EventEmitter();
for (var n in events.EventEmitter.prototype) {
    Schema[n] = events.EventEmitter.prototype[n];
}

Schema.prototype.define = function (name, columnDefs, opts) {
    var Model = this.persist.define(name, columnDefs, opts);

    // inherit ModelsClass methods
    for (var i in ModelClass) {
        Model[i] = ModelClass[i];
    }

    for (var j in ModelClass.prototype) {
        Model.prototype[j] = ModelClass.prototype[j];
    }

    Schema.emit('define', Model);
    this.models[name] = Model;
    return Model;
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

Schema.prototype.connect = function (cb) {
    if (!this.settings) {
        this.persist.connect(cb);
    } else {
        this.persist.connect(this.settings, cb);
    }
};

module.exports = exports = Schema;
