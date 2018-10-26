let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Imitatios', function (){
    describe('GET /imitations',  () => {
        it('should return all the imitations in an array', function(done) {
            chai.request(server)
                .get('/imitations')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a('array');
                    expect(res.body.length).to.equal(3);
                    let result = _.map(res.body, (imitation) => {
                        return {price: imitation.price }
                    });
                    expect(result).to.include( { price: 350  } );
                    expect(result).to.include( { price: 500  } );
                    done();
                });

        });
    });
    describe('POST /imitations', function () {
        it('should return confirmation message and update datastore', function(done) {
            let imitation = {
                brand: 'Burberry' ,
                type: 'coat',
                price: 460,
                reports: 8
            };
            chai.request(server)
                .post('/imitations')
                .send(imitation)
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('message').equal('Imitation Successfully Added!' );
                    done();
                });
        });
    });
    // describe('PUT /imitaions/:id/report', () => {
    //     it('should return a message and the imitation reported by 1', function(done) {
    //         chai.request(server)
    //             .put('/imitations/5bd0a4fae7179a176d3b377a/report')
    //             .end(function(err, res) {
    //                 expect(res).to.have.status(200);
    //                 let imitation = res.body.data ;
    //                 expect(imitation).to.include( { id: 5bd0a4fae7179a176d3b377a , reports: 8  } );
    //                 done();
    //             });
    //     });
    // });
});