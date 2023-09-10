const mongoose = require('mongoose');

const {Schema} = mongoose;

const TrainingDetails = new Schema({
    mentor_name: String,
    training_field: String,
    training_start: Date,
    training_end: Date,
    training_period: Number,
    training_status: String,
});

const TrainingDetail = mongoose.model('TrainingDetail',TrainingDetails)
module.exports = TrainingDetail;