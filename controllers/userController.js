const AdminDetails = require('../Models/AdminSchema')
const jwt = require('jsonwebtoken')
const SECRET = 'sodncsjcnkdjnjfdoodfn';

const createToken = (_id) => {
    return jwt.sign({_id}, SECRET , { expiresIn: '3d'})
}

//login user
const loginUser = async(req , res) =>{
    const { name, email, password } = req.body;
    try {
        const admin = await AdminDetails.login(name, email, password);
        const token = createToken(admin._id);
        res.status(200).json({name, email, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const signupUser = async(req , res) =>{
    const { name, email, password } = req.body;
    try {
        const newadmin = await AdminDetails.signup(name, email, password);
        const token = createToken(newadmin._id);
        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
    
}
module.exports = {loginUser , signupUser}

