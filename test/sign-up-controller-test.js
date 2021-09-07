process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = require('chai').assert;

const app = require('../index.js');

chai.use(chaiHttp);

describe('the fuunction to handle user sign-up', function() {
    it('should store all the details given during sign-up', function(done) {
        chai.request(app)
            .post('/postSignUp')
            .send({
                username: "boop",
                password: "a1b2c3d4",
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
                const properties = ['username', 'firstName', 'middleName', 'lastName', 'emailAddress',
                                    'contactNumber', 'region', 'province', 'city', 'barangay',
                                    'zipCode', 'address', 'orderIds', 'threadId', 'pictureFileName']
                
                for (var property of properties) {
                    assert.property(res.body, property);
                }

                done();
            });
    });

    it('should not send the password in the response body', function(done) {
        chai.request(app)
        .post('/postSignUp')
        .send({
            username: "boop",
            password: "a1b2c3d4",
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
            assert.notProperty(res.body, 'password');
            done();
        });
    });

    it('should not store details not found in the Client schema', function(done) {
        chai.request(app)
        .post('/postSignUp')
        .send({
            username: "boop",
            password: "a1b2c3d4",
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
            assert.notProperty(res.body, 'boop');
            done();
        });
    });
});