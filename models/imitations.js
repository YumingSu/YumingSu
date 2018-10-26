let mongoose = require('mongoose');

let ImitationSchema = new mongoose.Schema({
    brand : String,
    type : String,
    price : Number,
    reports : {type:Number}
    },
    { collection: 'imitations' });

module.exports = mongoose.model('Imitation', ImitationSchema);