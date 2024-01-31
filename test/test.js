var expect = require("chai").expect;
var request = require("request");
const supertest = require("supertest");
const io = require('socket.io-client');
const serverUrl = 'http://localhost:3000';

//http://localhost:3000/api/dog 
/*
Request: 
{
	"title": "Cute+Doggo+6",
	"path": "/images/doggo-5.jpg",
	"subTitle": "He's+so+cute+and+small",
	"description": "The+cutest+boy"
}

Response:
{
	"statusCode": 201,
	"data": {
		"acknowledged": true,
		"insertedId": "65b8bad293db5a6fa24767f2"
	},
	"message": "success"
} */

describe("Testing the getAllDoggos functionality (GET request)", function() {
    var url = "http://localhost:3000/api/dog";
    it("returns status 200 to check if api works and we are able to receive a returned webpage", function(done) {
        request(url, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done()
          });
    });

    it("check whether the item returned is a JSON object, as this is what is expected. It cannot be an array or a function", function(done) {
        request(url, function(error, response, body) {
            expect(response).to.be.an('object');
            expect(response).to.not.be.an('array');
            expect(response).to.not.be.a('function');
            done()
          });
    });

    it("returns statusCode key in body to check if api give right result should be 200", function(done) {
        request(url, function(error, response, body) {
            body = JSON.parse(body)
            expect(body.statusCode).to.equal(200);
            done()
          });
    });
    
});


describe("Testing the postDoggo functionality (POST request)", function() {
    var url = "http://localhost:3000";
    it('The app should respond with a 200 code as a result of posting', function(done) {
        supertest(url) 
            .post('/api/dog')
            .send({
            title: "Cute+Doggo+6",
            path: "/images/doggo-5.jpg",
            subTitle: "He's+so+cute+and+small",
            description: "The+cutest+boy"
            })
          
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.statusCode).to.equal(200);

            done();
        });  
    });

    it('The app should return a JSON object with a status code 201 and a message that says "success" that confirms successful posting of data', function(done) {
        supertest(url) 
            .post('/api/dog')
            .send({
            title: "Cute+Doggo+6",
            path: "/images/doggo-5.jpg",
            subTitle: "He's+so+cute+and+small",
            description: "The+cutest+boy"
            })
          
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body.statusCode).to.equal(201);
                expect(res.body.message).to.equal('success');

            done();
        });  
    });
});
var client1Disconnect = 0;
var client2Disconnect = 0;

describe('Testing socket functionality', function () {
    const client1 = io.connect(serverUrl);
    const client2 = io.connect(serverUrl);
    
    it('Server should broadcast message to all clients', function (done) {
        

        client1.on('number', function (num) {
            expect(num).to.be.a('number');
            client1.disconnect;
            client1Disconnect = 1;
            client1.off('number');
            console.log('Client 1 disconnected');
            checkBothClientsDisconnected();
        });

        client2.on('number', function (num) {
            expect(num).to.be.a('number');
            client2.disconnect;
            client2Disconnect = 1;
            client2.off('number');
            console.log('Client 2 disconnected'); 

            checkBothClientsDisconnected();
        });

        console.log('everything okay')

        function checkBothClientsDisconnected() {
            if (client1Disconnect === 1 && client2Disconnect === 1) {
              console.log('Both clients disconnected, ending test');
              done();
            }
        }
        
        afterEach(function (done) {
            client1.disconnect();
            client2.disconnect();
            done();
          });
    });

});
