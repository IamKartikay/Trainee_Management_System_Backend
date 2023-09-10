const mongoose = require('mongoose');
const {Schema} = mongoose;

const DepartmentDetailSchema = new Schema({
    name: String,
    labDetails: { type: Schema.Types.ObjectId, ref: 'DRDO_Labs'}
}); 

const DepartmentDetail = mongoose.model('DepartmentDetail',DepartmentDetailSchema)
module.exports = DepartmentDetail;
