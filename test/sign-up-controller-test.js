process.env.NODE_ENV = 'test'

const chai = require('chai');
const chaiHttp = require('chai-http');

const assert = require('chai').assert;

const app = require('../index.js');

chai.use(chaiHttp);

describe('the function to submit information stored in the sign up page', function() {
    it('should store all the details given during sign up', function(done) {
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

    it('should send an HTTP 200 status code if successful', function(done) {
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
            assert.equal(res.statusCode, 200);
            done();
        });
    });
});

describe('the function to verify whether the entered username is unique', function() {
    it('should be able to read the query without errors', function(done) {
        chai.request(app)
        .get('/getCheckUsername')
        .query({
            username: "boop"
        })
        .end(function(error, res) {
            assert.equal(res.text, '');
            done();
        });
    });

    it('should reject queries that cannot be converted to lowercase (blank queries)', function(done) {
        chai.request(app)
        .get('/getCheckUsername')
        .query({
        })
        .end(function(error, res) {
            assert.notEqual(res.text, '');
            done();
        });
    });
});

describe('the function to verify whether the entered email address is unique', function() {
    it('should be able to read the query without errors', function(done) {
        chai.request(app)
        .get('/getCheckEmail')
        .query({
            email: "boop@boopin.com"
        })
        .end(function(error, res) {
            assert.equal(res.text, '');
            done();
        });
    });
});