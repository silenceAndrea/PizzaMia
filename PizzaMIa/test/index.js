var test = require('tape');
var request = require('supertest');
var app = require('../server.js');


test('TEST1: correct pizzeria added', function (assert) {
    request(app)
        .post('/api/pizzeria')
        .send({
            "name": "nuovaPizzeria", "city": "Roma", "state": "Italia",
            "address": "via francesco d'amico",
            "number": "3355791520"
        })
        .end((err, res) => {

            if (err) {
                reject(new Error('An error occured with the pizzeria Adding API, err: ' + err));
            }else{
                assert.error(err, 'No error');
                assert.isEqual("Added Successfully", res.body, "Pizzeria added correctly");
            }

            
            assert.end();
        });
});
