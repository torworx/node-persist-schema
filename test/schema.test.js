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
    })
});