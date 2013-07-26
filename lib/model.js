module.exports = ModelClass;

/**
 * Module dependencies
 */
require('./checkers');

function ModelClass() {}

ModelClass.create = function (connection, values, callback) {
    var Model = this;
    if (!callback) callback = function () {
    };
    var obj = new Model(values);
    obj.save(connection, callback);
    return obj;
};

ModelClass.prototype.values = function () {
    var values = {};
    for (var col in this._getModel().columns) {
        values[col] = this[col];
    }
    return values;
};