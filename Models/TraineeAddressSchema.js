const mongoose = require('mongoose');

const {Schema} = mongoose;

const TraineeAddressSchema = new Schema({
    current_address: String,
    permanent_address: String,
})

const TraineeAddress = mongoose.model('TraineeAddress',TraineeAddressSchema)
module.exports = TraineeAddress;