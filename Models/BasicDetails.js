const mongoose = require('mongoose');

const {Schema} = mongoose;

const TraineeBasicDetails = new Schema({
    first_name: String,
    last_name: String,
    contact_no: Number,
    email: {type: String, required: true, unique: true }
}); 

const BasicDetail = mongoose.model('TraineeBasicDetails',TraineeBasicDetails)
module.exports = BasicDetail;




