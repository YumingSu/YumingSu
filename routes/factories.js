let Factory = require('../models/factories');
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

    Factory.find(function(err, factories) {
        if (err)
            res.send(err);

        res.send(JSON.stringify(factories,null,5));
    });
}

router.findOne = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    Factory.find({ "_id" : req.params.id },function(err, factory) {
        if (err)
            res.send('FACTORY NOT FOUND!!');
        else
            res.send(err);
    });
}

function getTotalReports(array) {
    let totalReports = 0;
    array.forEach(function(obj) { totalReports += obj.reports; });
    return totalReports;
}


router.addFactory = (req, res) => {

    res.setHeader('Content-Type', 'application/json');

    var factory = new Factory();

    factory.place = req.body.place;
    factory.size = req.body.size;

    factory.save(function(err) {
        if (err)
            res.json({ message: 'Factory NOT Added!', errmsg : err } );
        else
            res.json({ message: 'Factory Successfully Added!', data: factory });
    });
}


router.incrementReports = (req, res) => {

    Factory.findById({"_id" : req.params.id}, function(err,factory) {
        if (err)
            res.send('Factory NOT Reported Successfully!!');
        else {
            factory.reports += 1;
            factory.save(function (err) {
                if (err)
                    res.send('Invalid Factory!! NOT Reported Successfully!!');
                else
                    res.send('Factory Reported Successfully!!');
            });
        }
    });
}

router.deleteFactory = (req, res) => {

    Factory.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.json({ message: 'Factory NOT DELETED!', errmsg : err } );
        else
            res.json({ message: 'Factory Successfully Deleted!'});
    });
}

router.findTotalReports = (req, res) => {

    Factory.find(function(err, factories) {
        if (err)
            res.send(err);
        else
            res.json({ totalReports : getTotalReports(factories) });
    });
}

module.exports = router;