const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = require('chai').assert;

const app = require('../index.js');

chai.use(chaiHttp);

describe('hello', function() {
    it('hello', function(done) {
        chai.request(app)
            .post('/postSignUp')
            .send({
                firstName: "hello",
                middleName: "nihao",
                lastName: "maligaya",
                emailAddress: "hello@gmail.com",
                contactNumber: "0912356789",
                region: "Region III",
                province: "Nueva Ecija",
                city: "Cabiao",
                barangay: "Palasinan",
                zipCode: "1230",
                address: "hello",
                orderIds: [],
                threadId: "1234",
                pictureFileName: "hello.png"
            })
            .end(function(error, res) {
                done();
            });
    });
});