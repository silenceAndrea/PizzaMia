var test = require('tape');
var request = require('supertest');
var app = require('../server.js');


test('TEST1: Correct farina returned', function (assert) {
    request(app)
        .get('/api/farina')
        .end(function (err, res) {
            console.log(res.body.length);
            var NumOfFarine = res.body.length;
            var result = false;
            if (NumOfFarine == 0) {
                result = true;
            }

            assert.error(err, 'No error');
            assert.notEqual(true, result, 'Farine retrieved Correctly');
            assert.end();
        });
});
