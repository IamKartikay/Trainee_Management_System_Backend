const mongoose = require("mongoose");

const { Schema } = mongoose;

const TraineeSchema = new Schema({
  basicDetails: { type: Schema.Types.ObjectId, ref: "TraineeBasicDetails" },
  addressDetails: { type: Schema.Types.ObjectId, ref: "TraineeAddress" },
  trainingDetails: { type: Schema.Types.ObjectId, ref: "TrainingDetail" },
  academicDetails: { type: Schema.Types.ObjectId, ref: "AcademicDetail" },
  departmentDetails: { type: Schema.Types.ObjectId, ref: "DepartmentDetail" },
  labDetails: { type: Schema.Types.ObjectId, ref: "DRDO_Labs" },
});

const Trainee = mongoose.model("Trainee", TraineeSchema);
module.exports = Trainee;
