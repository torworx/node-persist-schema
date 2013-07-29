var Schema = require('../').Schema,
    t = Schema.types,
    assert = require('assert');

describe('Schema', function() {

    it('define', function() {
        var schema = new Schema();
        var Person = schema.define("Person", {
            "name": t.STRING
        });
        assert.equal(schema.models.Person, Person);
        assert.equal(schema.model('person'), Person);
    });

    it('values', function() {
        var schema = new Schema();
        var Person = schema.define("Person", {
            "name": t.STRING
        });
        var person = new Person({name: 'taoyuan'});
        var values = person.values();
        var keys = Object.keys(values);
        assert.equal(keys.length, 2);
        assert.ok(keys.indexOf('id') >= 0);
        assert.ok(keys.indexOf('name') >= 0);
        assert.equal(values.name, 'taoyuan');
    });

    it('connection event', function (done) {
        var schema = new Schema;
        schema.on('connection', function (connection, _schema) {
            assert.ok(connection);
            assert.equal(schema, _schema);
            done();
        });
    });
});