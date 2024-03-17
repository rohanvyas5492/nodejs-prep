const User = require("../model/user");

//Getting all users
const handleGetAllUsers = async(req,res)=>{
    const users = await User.find({});
    return res.status(200).json({status:"success",users:users});
}

//Creating a user
const handleCreateUser = async(req,res)=>{
    const {first_name,last_name,email,gender,job_type} = req.body;
    if(!first_name || !last_name || !email || !gender || !job_type ){
        return res.status(404).json({status:"failed",err:"All fields are required..."});
    }
    const result = await User.create({
        first_name:first_name,
        last_name:last_name,
        email:email,
        gender:gender,
        job_type:job_type,
    });
    return res.status(201).json({status:"success",data:result});
}

//Getting a single user
const handleGetSingleUser = async(req,res)=>{
    const result = await User.findById(req.params.id);
    console.log(req.params.id)
    if(!result){
        res.status(404).json({status:"failed",err:"User Not found"});
    }
    res.status(200).json({status:"success",user:result});
}

//Editing a user
const handleEditSingleUser = async(req,res)=>{
    console.log(req.body)
    try {
        const result = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!result) {
            return res.status(404).json({ status: "failed", err: "User not found" });
        }
        return res.status(200).json({ status: "success", user: result });
    } catch (error) {
        return res.status(500).json({ status: "failed", err: error.message });
    }
}

//Deleting a user
const handleDeleteUser = async(req,res)=>{
    try {
        const result = await User.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).json({ status: "failed", err: "User not found" });
        }
        return res.status(200).json({ status: "success", message: "User deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: "failed", err: error.message });
    }
}

module.exports = {
    handleGetAllUsers,
    handleCreateUser,
    handleGetSingleUser,
    handleEditSingleUser,
    handleDeleteUser
}