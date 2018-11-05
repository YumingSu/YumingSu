let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../bin/www');
let expect = chai.expect;
let Datastore = require('../../models/imitations');

chai.use(chaiHttp);
chai.use(require('chai-things'));
let _ = require('lodash' );

describe('Imitations', function (){
    beforeEach(function(done){
        let datastore1 = new Datastore({
            _id:"5be05619bf769d0c48480d28",
            brand:'Coach',
            type:  'bag',
            price: 350,
            reports: 20
        });
        let datastore2 = new Datastore({
            _id: "5be05619bf769d0c48480d29",
            brand:'Hermès',
            type:  'bag',
            price: 500,
            reports: 13
        });
        let datastore3 = new Datastore({
            _id:"5be05619bf769d0c48480d2a",
            brand:'Chanel',
            type:  'shirt',
            price: 310,
            reports: 8
        });
        datastore1.save();
        datastore2.save();
        datastore3.save();
        done();
    });
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
                    Datastore.collection.remove();
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
        after(function  (done) {
            chai.request(server)
                .get('/imitations')
                .end(function(err, res) {
                    let result = _.map(res.body, (imitation) => {
                        return { brand: imitation.brand,
                            type: imitation.type,
                        price: imitation.price};
                    }  );
                    expect(result).to.include( { brand: 'Burberry', type: 'coat', price: 460  } );
                    Datastore.collection.remove();
                    done();
                });
        });
    });
    describe('PUT /imitations/:id/report', function () {
        it('should return a 404 and a message for invalid imitation id', function(done) {
            chai.request(server)
                .put('/imitations/5bdxxxxxx7179a176d3b377a/report')
                .end(function(err, res) {
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property('message').equal('Imitation NOT Reported Successfully!!' ) ;
                    done();
                });
        });
        it('should return a message and the imitation reported by 1', function(done) {
            chai.request(server)
                .put('/imitations/5be05619bf769d0c48480d28/report')
                .end(function(err, res) {
                    expect(res).to.have.status(200);
                    // let imitation = res.body.data ;
                    // expect(imitation).to.include( { brand:'Coach', type:'bag', price:350, reports: 20  } );
                    expect(res.body).to.have.property('message').equal('Imitation Reported Successfully!!' );
                    done();
                });
        });
        after(function  (done) {
            chai.request(server)
                .get('/imitations')
                .end(function(err, res) {
                    let result = _.map(res.body, (imitation) => {
                        return { brand: imitation.brand,
                            type: imitation.type,
                            price: imitation.price,
                        };
                    }  );
                    expect(result).to.include( {brand:"Coach",type:"bag",price:350 } );
                    Datastore.collection.remove();
                    done();
                });
        });
    });
    describe('Delete /imitations/:id', function () {
        describe('when it is valid id' , function () {
            it('should return a message and the imitation successfully deleted', function () {
                chai.request(server)
                    .delete('/imitations/5be05619bf769d0c48480d28')
                    .end(function (err,res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.have.property('message').equal('Imitation Successfully Deleted!' );
                        done();
                    })
            });
            after(function  (done) {
                chai.request(server)
                    .get('/imitations')
                    .end(function(err, res) {
                        expect(res).to.have.status(200);
                        expect(res.body).to.be.a('array');
                        let result = _.map(res.body, (imitation) => {
                            return { brand: imitation.brand,
                                type: imitation.type,
                                price: imitation.price,
                            };
                        }  );
                        expect(result).to.include( {brand:"Coach",type:"bag",price:350 } );
                        done();
                    });
            });
            describe('when it is invalid' , function () {
                it('should return a message and the imitation unsuccessfully deleted', function () {
                    chai.request(server)
                        .delete('/imitations/5bdxxxxxx7179a176d3b377a')
                        .end(function (err,res) {
                            expect(res).to.have.status(200);
                            expect(res.body).to.have.property('message').equal('Imitation NOT DELETED!' ) ;
                            Datastore.collection.remove();
                            done();
                        })
                });

            });
        });

    });
});
