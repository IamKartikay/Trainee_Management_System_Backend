const express = require("express");
const bodyParser = require("body-parser");
const validator = require("validator");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const Trainee = require(".//Models/Trainee");
const TrainingDetail = require("./Models/TrainingDetails");
const BasicDetail = require("./Models/BasicDetails");
const TraineeAddress = require("./Models/TraineeAddressSchema");
const AcademicDetail = require("./Models/AcademicSchema");
const LabDetails = require("./Models/LabsSchema");
const DepartmentDetail = require("./Models/DepartmentSchema");
const userRoutes = require("./routes/user");
require("dotenv").config()

app.use(cors());
app.use(cors({
  origin: ["https://traineemngsys.netlify.app/"],
  methods: ["POST", "GET", "DELETE", "PUT"],
  credentials: true
}))


app.use(express.json());
app.use("/api/admin", userRoutes);

const PORT = process.env.PORT || 5001;





//connection
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_NAME}:${process.env.MONGO_DB_PASSWORD}@cluster0.tmchiei.mongodb.net/?retryWrites=true&w=majority`
  );
  console.log('connected');
}


// ADD A NEW TRAINEE
app.post("/details", async (req, res) => {
  const { basicDetails, academicDetails, trainingDetails } = req.body;
  console.log(req.body);

  const basicRecord = await BasicDetail.create({
    first_name: basicDetails.first_name,
    last_name: basicDetails.last_name,
    contact_no: basicDetails.contact_no,
    email: basicDetails.email,
  });

  const addressRecord = await TraineeAddress.create({
    current_address: basicDetails.permanent_address,
    permanent_address: basicDetails.current_address,
  });

  const academicRecord = await AcademicDetail.create({
    tenth_School: academicDetails.tenth_School,
    tenth_grades: academicDetails.tenth_grades,
    twelth_School: academicDetails.twelth_School,
    twelth_grades: academicDetails.twelth_grades,
    btech_institute: academicDetails.btech_institute,
    btech_yop: academicDetails.btech_yop,
    btech_sem1_grades: academicDetails.btech_sem1_grades,
    btech_sem2_grades: academicDetails.btech_sem2_grades,
    btech_sem3_grades: academicDetails.btech_sem3_grades,
    btech_sem4_grades: academicDetails.btech_sem4_grades,
    btech_sem5_grades: academicDetails.btech_sem5_grades,
    btech_sem6_grades: academicDetails.btech_sem6_grades,
    btech_sem7_grades: academicDetails.btech_sem7_grades,
    btech_sem8_grades: academicDetails.btech_sem8_grades,

    mtech_institute: academicDetails.mtech_institute,
    mtech_yop: academicDetails.mtech_yop,
    mtech_sem1_grades: academicDetails.mtech_sem1_grades,
    mtech_sem2_grades: academicDetails.mtech_sem2_grades,
    mtech_sem3_grades: academicDetails.mtech_sem3_grades,
    mtech_sem4_grades: academicDetails.mtech_sem4_grades,
  });

  const trainingRecord = await TrainingDetail.create({
    mentor_name: trainingDetails.mentor_name,
    training_field: trainingDetails.training_field,
    training_start: trainingDetails.training_start,
    training_end: trainingDetails.training_end,
    training_status: trainingDetails.training_status,
    training_period: trainingDetails.training_period,
  });

  try {
    const dept = await DepartmentDetail.find({
      name: trainingDetails.departmentName,
    });
    const lab = await LabDetails.find({ name: trainingDetails.selectedLab });
    //find returns an array of objects
    if(dept.length == 0 || lab.length == 0)
    {
      throw Error('Try Again')
    }
    const trainee = await Trainee.create({
      basicDetails: basicRecord._id,
      academicDetails: academicRecord._id,
      trainingDetails: trainingRecord._id,
      addressDetails: addressRecord._id,
      departmentDetails: dept[0]._id,
      labDetails: lab[0]._id,
    });

    res.status(200)
    return;
  } catch (error) {
    res.status(400)
  }
});

// UPDATE AN EXISTING TRAINEE
app.put('/trainee/update', async(req, res)=>{
  // const { id ,basicDetails, academicDetails, trainingDetails } = req.body;

  const {basicDetails, academicDetails, trainingDetails, addressDetails} = await Trainee.findOne({_id: req.body.id}) //returns an object 
  
  const updatedBasicDetails = await BasicDetail.updateOne(
    { _id: basicDetails },
    {
      $set: {
        first_name: req.body.basicDetails.first_name,
        last_name: req.body.basicDetails.last_name,
        contact_no: req.body.basicDetails.contact_no,
        email: req.body.basicDetails.email,
      }
    }
  );

  const updatedAcademicDetails = await AcademicDetail.updateOne(
    { _id: academicDetails },
    {
      $set: {
        tenth_School: req.body.academicDetails.tenth_School,
        tenth_grades: req.body.academicDetails.tenth_grades,
        twelth_School: req.body.academicDetails.twelth_School,
        twelth_grades: req.body.academicDetails.twelth_grades,
        btech_institute: req.body.academicDetails.btech_institute,
        btech_yop: req.body.academicDetails.btech_yop,
        btech_sem1_grades: req.body.academicDetails.btech_sem1_grades,
        btech_sem2_grades: req.body.academicDetails.btech_sem2_grades,
        btech_sem3_grades: req.body.academicDetails.btech_sem3_grades,
        btech_sem4_grades: req.body.academicDetails.btech_sem4_grades,
        btech_sem5_grades: req.body.academicDetails.btech_sem5_grades,
        btech_sem6_grades: req.body.academicDetails.btech_sem6_grades,
        btech_sem7_grades: req.body.academicDetails.btech_sem7_grades,
        btech_sem8_grades: req.body.academicDetails.btech_sem8_grades,
    
        mtech_institute: req.body.academicDetails.mtech_institute,
        mtech_yop: req.body.academicDetails.mtech_yop,
        mtech_sem1_grades: req.body.academicDetails.mtech_sem1_grades,
        mtech_sem2_grades: req.body.academicDetails.mtech_sem2_grades,
        mtech_sem3_grades: req.body.academicDetails.mtech_sem3_grades,
        mtech_sem4_grades: req.body.academicDetails.mtech_sem4_grades,
      }
    }
  );

  const updatedTrainingDetails = await TrainingDetail.updateOne(
    { _id: trainingDetails },
    {
      $set: {
        mentor_name: req.body.trainingDetails.mentor_name,
        training_field: req.body.trainingDetails.training_field,
        training_start: req.body.trainingDetails.training_start,
        training_end: req.body.trainingDetails.training_end,
        training_status: req.body.trainingDetails.training_status,
        training_period: req.body.trainingDetails.training_period,
      }
    }
  );

  const updatedAddressDetails = await TraineeAddress.updateOne(
    { _id: addressDetails },
    {
      $set: {
        current_address: req.body.basicDetails.permanent_address,
        permanent_address: req.body.basicDetails.current_address,
      }
    }
  );

  //update trainee's department
  const updatedDepartment = req.body.trainingDetails.departmentName;
  const newDepartment = await DepartmentDetail.findOne({name: updatedDepartment}); //will return an object

  const updatedDepartmentDetails = await Trainee.updateOne(
    { _id: req.body.id },
    {
      $set: {
        departmentDetails: newDepartment._id
      }
    }
  );

  if(updatedBasicDetails.acknowledged && updatedAcademicDetails.acknowledged && updatedAddressDetails.acknowledged && updatedTrainingDetails.acknowledged && updatedDepartmentDetails.acknowledged)
  {
    res.status(200).json({updated: true})
  }else{
    res.status(400).json({updated: false})
  }

})

// SHOW ALL TRAINEES
app.get("/show/:selectedLab", async (req, res) => {
  try {
    const lab = req.params.selectedLab;
    console.log(lab);
    const labdetails = await LabDetails.find({name: lab})//returns and array of obj
    console.log(labdetails);
    if(labdetails.length == 0)
    {
      throw Error('Lab Details Not Reached')
    }
    const allTrainees = await Trainee.find({labDetails: labdetails[0]._id})
      .populate("basicDetails")
      .populate("academicDetails")
      .populate("trainingDetails")
      .populate("addressDetails")
      .populate("departmentDetails")
      .populate("labDetails")
      .exec();

    res.status(200).json(allTrainees);
  } catch (error) {
    res.status(400).json({error : error})
  }
});


app.get("/findTrainee", async (req, res) => {
  const { firstName, lastName } = req.query;
  const fname = new RegExp(firstName);
  const lname = new RegExp(lastName);
  console.log(fname, lastName);
  try {
    const allTrainees = await BasicDetail.find({ first_name: /adhav/ });
    if (allTrainees) res.json(allTrainees);
    else res.send("No such trainee in db");
  } catch (error) {
    console.log(error);
  }
});

app.get("/labs", async (req, res) => {
  const labs = await LabDetails.distinct("name");
  res.json(labs);
});

app.get("/dashboard", async (req, res) => {
  var departments = await DepartmentDetail.find({}, { name: 1 }); //can also use distinct in future
  const trainingFields = await TrainingDetail.distinct("training_field", {
    training_status: "Ongoing",
  });
  const result = await TrainingDetail.aggregate([
    {
      $facet: {
        countOngoing: [
          {
            $match: {
              training_status: "Ongoing",
            },
          },
          {
            $count: "count",
          },
        ],
        countAll: [
          {
            $count: "count",
          },
        ],
      },
    },
  ]);

  const countPromises = departments.map(async (dept) => {
    const Ongoingcount = await Trainee.aggregate([
      {
        $match: {
          departmentDetails: dept._id,
        },
      },
      {
        $lookup: {
          from: "trainingdetails", // Collection name for TrainingDetail
          localField: "trainingDetails",
          foreignField: "_id",
          as: "trainingDetailsData",
        },
      },
      {
        $match: {
          "trainingDetailsData.training_status": "Ongoing",
        },
      },
      {
        $count: "Ongoingcount",
      },
    ]);
    const Completedcount = await Trainee.aggregate([
      {
        $match: {
          departmentDetails: dept._id,
        },
      },
      {
        $lookup: {
          from: "trainingdetails", // Collection name for TrainingDetail
          localField: "trainingDetails",
          foreignField: "_id",
          as: "trainingDetailsData",
        },
      },
      {
        $match: {
          "trainingDetailsData.training_status": "Completed",
        },
      },
      {
        $count: "Completedcount",
      },
    ]);
    return {
      ...dept.toObject(),
      Ongoingcount: Ongoingcount[0] ? Ongoingcount[0].Ongoingcount : 0,
      Completedcount: Completedcount[0] ? Completedcount[0].Completedcount : 0,
    };
  });
  const departmentsWithCount = await Promise.all(countPromises);

  res.send({
    departmentsWithCount,
    departments,
    trainingFields,
    traineeCounts: {
      Ongoing: result[0].countOngoing[0].count,
      AllTime: result[0].countAll[0].count,
    },
  });
});

app.get("/getDepartments", async (req, res) => {
  var departments = await DepartmentDetail.find({}, { name: 1 });
  res.status(200).json(departments);
});


app.delete("/trainee/delete/:traineeId", async (req, res) => {

  try {
    const traineeId = req.params.traineeId;
    const trainee = await Trainee.findById(traineeId);
  
    const deletePromises = [];
    deletePromises.push(await Trainee.findByIdAndDelete(traineeId))
    deletePromises.push(await AcademicDetail.findByIdAndDelete(trainee.academicDetails))
    deletePromises.push(await TrainingDetail.findByIdAndDelete(trainee.trainingDetails))
    deletePromises.push(await TraineeAddress.findByIdAndDelete(trainee.addressDetails))
    deletePromises.push(await BasicDetail.findByIdAndDelete(trainee.basicDetails))

    await Promise.all(deletePromises)  
    res.status(200).json({ success: true });
    return;
  } catch (error) {
    res.status(400).json({ error: error });
  }
});


app.delete("/department/delete/:deptId" , async (req, res) => {
  try {
    const deptId = req.params.deptId;
    console.log(req.params.deptId);
    const traineesInDept = await Trainee.find({departmentDetails: deptId}, {departmentDetails: 0, labDetails: 0, __v: 0});
    var traineIds=[];
    var basicDetIds=[];
    var addressIds=[];
    var trainingIds=[];
    var academicIds=[];

    await Promise.all(traineesInDept.map(async entry => {
      traineIds.push(entry._id);
      basicDetIds.push(entry.basicDetails);
      addressIds.push(entry.addressDetails);
      trainingIds.push(entry.trainingDetails);
      academicIds.push(entry.academicDetails);
    }));
    
    const deletePromises = [];
    deletePromises.push(await Trainee.deleteMany({ _id: { $in: traineIds.map(id => id) } }));
    deletePromises.push(await AcademicDetail.deleteMany({ _id: { $in: academicIds.map(id => id) } }));
    deletePromises.push(await TrainingDetail.deleteMany({ _id: { $in: trainingIds.map(id => id) } }));
    deletePromises.push(await TraineeAddress.deleteMany({ _id: { $in: addressIds.map(id => id) } }));
    deletePromises.push(await BasicDetail.deleteMany({ _id: { $in: basicDetIds.map(id => id) } }));
    deletePromises.push(await DepartmentDetail.findByIdAndDelete(deptId))

    await Promise.all(deletePromises)    
    res.status(200).json({success: true});
  } catch (error) {
    res.status(400).json({error: error})
  }
});

app.put("/findTrainee", async (req, res) => {
  const { selectedLab, selectedDepartment, firstName, lastName, email } = req.body;

  console.log(req.body);

  if (!selectedLab || !email || !selectedDepartment || !firstName || !lastName) {
    throw Error("All field must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }


  const dept = await DepartmentDetail.find({name: selectedDepartment}, {_id:1});

  const lab = await LabDetails.find({ name: selectedLab} ,{_id:1});

  console.log(dept[0]._id , lab[0]._id)

  const trainee = await Trainee.aggregate([
    {
      $match: {
        labDetails: lab[0]._id,
        departmentDetails: dept[0]._id,
      }
    },
    {
      $lookup: {
        from: 'traineebasicdetails',
        localField: 'basicDetails',
        foreignField: '_id',
        as: 'basicDetails'
      }
    },
    {
      $lookup: {
        from: 'trainingdetails',
        localField: 'trainingDetails',
        foreignField: '_id',
        as: 'trainingDetails'
      }
    },
    {
      $lookup: {
        from: 'departmentdetails',
        localField: 'departmentDetails',
        foreignField: '_id',
        as: 'departmentDetails'
      }
    },
    {
      $lookup: {
        from: 'academicdetails',
        localField: 'academicDetails',
        foreignField: '_id',
        as: 'academicDetails'
      }
    },
    {
      $lookup: {
        from: 'traineeaddresses',
        localField: 'addressDetails',
        foreignField: '_id',
        as: 'addressDetails'
      }
    },
    {
      $unwind: '$basicDetails'
    },
    {
      $unwind: '$trainingDetails'
    },
    {
      $unwind: '$departmentDetails'
    },
    {
      $unwind: '$academicDetails'
    },
    {
      $unwind: '$addressDetails'
    },
    {
      $match: {
        'basicDetails.first_name': firstName,
        'basicDetails.last_name': lastName,
        'basicDetails.email': email
      }
    },
  ])
  

  console.log(trainee[0]);
  if (trainee.length > 0) {
     res.status(200).json(trainee)
  }else{
    res.status(400).json({status: 'no trainee found'})
  }

});


app.put('/showDepartments' , async(req, res)=>{
  const {selectedLab} = req.body;

  try {
    const lab = await LabDetails.find({ name: selectedLab} ,{_id:1});//returns an array of objects
    const dept = await DepartmentDetail.find({labDetails: lab[0]._id}, {labDetails:0});//return an array of obj
  
    res.status(200).json(dept);
  } catch (error) {
    res.status(400).json({error: error.message});
  }

})

app.put('/department/update' , async(req, res)=>{

  const { id, updatedDepartmentName } = req.body
  console.log(id, updatedDepartmentName)

  const updatedDepartmentDetails = await DepartmentDetail.updateOne(
    { _id: id},
    {
      $set: {
        name: updatedDepartmentName
      }
    }
  );

  if(updatedDepartmentDetails.acknowledged)
  {
    res.status(200).json({updated: true})
  }else{
    res.status(400).json({updated: false})
  }
})


app.post('/addDepartment' , async(req , res)=>{
  const {selectedLab , deptName} = req.body;
  const lab = await LabDetails.find({ name: selectedLab} ,{_id:1});//returns an array of objects

  try {
    const newDept = await DepartmentDetail.create({
      name: deptName, 
      labDetails: lab[0]._id,
    })

    res.status(200).json({status: 'ok'});
  } catch (error) {
    res.status(400).json({error})
  }
})

app.delete('/del', async(req, res)=>{
  const a = await TrainingDetail.deleteMany({mentor_name: "t3"})
  console.log(a);
  res.end('ok')
})

app.listen(PORT, () => {
  console.log(`Listening at ${PORT}`);
});





