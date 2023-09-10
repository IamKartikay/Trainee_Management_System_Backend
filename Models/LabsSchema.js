const mongoose = require('mongoose');

const {Schema} = mongoose;

const DRDOLabDetailSchema = new Schema({
    name: String,
}); 

const LabDetails = mongoose.model('DRDO_Labs',DRDOLabDetailSchema)
module.exports = LabDetails;
