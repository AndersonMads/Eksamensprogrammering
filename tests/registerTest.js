const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server.js')

chai.use(chaiHttp);


describe('server', () => {
    describe('POST /register', () => {
        it('should push req.body to an array', (done) => {
            chai
            .request(app)
            .post('/register')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                done();
            })
            
        })
    })
})



// Test med få alle varer til salg. Tester om status er = 200, om det returnerer et array og om længden af det er 4
describe('server', () => {
    describe('GET /items', () => {
        it('should return an array', (done) => {
            chai
            .request(app)
            .get('/items')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.equal(200);
                expect(res.body).to.be.an('array');
                expect(res.body.length).to.equal(4)
                done();
            })
            
        })
    })
})