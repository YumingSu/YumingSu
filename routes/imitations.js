let Imitation = require('../models/imitations');
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

var mongodbUri ='mongodb://imitationsdb:LLEAFE8q4@ds139883.mlab.com:39883/imitationsdb';

mongoose.connect(mongodbUri);

let db = mongoose.connection;

db.on('error', function (err) {
    console.log('Unable to Connect to [ ' + db.name + ' ]', err);
});

db.once('open', function () {
    console.log('Successfully Connected to [ ' + db.name + ' ]');
});

router.findAll = (req, res) => {
    // Return a JSON representation of our list
    res.setHeader('Content-Type', 'application/json');

    Imitation.find(function(err, imitations) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(imitations,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Imitation.find({ "_id" : req.params.id },function(err, imitation) {
        if (err)
          res.send('Imitations NOT FOUND!!');
        else
          res.send(imitation,null,5);
    });
}



function getByValue(array, id) {
    var result  = array.filter(function(obj){return obj.id == id;} );
    return result ? result[0] : null; // or undefined
}


function getTotalReports(array) {
    let totalReports = 0;
    array.forEach(function(obj) { totalReports += obj.reports; });
    return totalReports;
}

router.addImitation = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var imitation = new Imitation();

    imitation.brand = req.body.brand;
    imitation.type = req.body.type;
    imitation.price = req.body.price;

    imitation.save(function(err) {
        if (err)
            res.json({ message: 'Imitation NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Imitation Successfully Added!', data: imitation });
    });
}

router.incrementReports = (req, res) => {

    Imitation.findById(req.params.id, function(err,imitation) {
        if (err)
            res.send('Imitation NOT Reported Successfully!!');
        else {
            imitation.reports += 1;
            imitation.save(function (err) {
                if (err)
                    res.send('Invalid Imitation!! NOT Reported Successfully!!');
                else
                res.send('Imitation Reported Successfully!!');
            });
        }
    });
}

router.deleteImitation = (req, res) => {

    Imitation.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Imitation NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Imitation Successfully Deleted!'});
    });
}

router.findTotalReports = (req, res) => {

    Imitation.find(function(err, imitations) {
        if (err)
            res.send(err);
        else
            res.json({ totalReports : getTotalReports(imitations) });
    });
}

router.findByBrand = (req, res) => {
    res.setHeader('Content-Type','application/json');
    var keyword = req.params.brand;
    var _filter = {
        $or:[
            {
                brand:{$regex:keyword,$options:'$i'}
            }
        ]
    };
    var count = 0;
    Imitation.count(_filter,function(err,imitation){
        if (err){
            res.json({errmsq : err});
        }
        else{
            count = imitation;
        }}
    );
    Imitation.find(_filter).limit(10).sort({"_id": -1}).exec(function(err,imitations){
        if(err || imitations.length == 0){
            res.json({message:"Imitations NOT Found!",errmsq:err});
        }else{
            res.send(JSON.stringify(imitations,null,5));
        }
    });
}

module.exports = router;