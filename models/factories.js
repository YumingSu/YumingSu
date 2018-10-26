let mongoose = require('mongoose');

let FactorySchema = new mongoose.Schema({
        place: String,
        size:String,
        reports: {type: Number}
    },
    { collection: 'factories' });

module.exports = mongoose.model('Factory', FactorySchema);