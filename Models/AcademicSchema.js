const mongoose = require('mongoose');

const {Schema} = mongoose;

const AcademicDetailSchema = new Schema({
    tenth_School: String,
    tenth_grades: Number,
    twelth_School: String,
    twelth_grades: Number,
    btech_institute: String,
    btech_yop: Number,
    btech_sem1_grades: Number,
    btech_sem2_grades: Number,
    btech_sem3_grades: Number,
    btech_sem4_grades: Number,
    btech_sem5_grades: Number,
    btech_sem6_grades: Number,
    btech_sem7_grades: Number,
    btech_sem8_grades: Number,
    mtech_institute: String,    
    mtech_yop: Number,
    mtech_sem1_grades: Number,
    mtech_sem2_grades: Number,
    mtech_sem3_grades: Number,
    mtech_sem4_grades: Number,
}); 

const AcademicDetail = mongoose.model('AcademicDetail',AcademicDetailSchema)
module.exports = AcademicDetail;
