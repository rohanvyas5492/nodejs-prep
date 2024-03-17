const express = require("express");
const router = express.Router();
const {handleGetAllUsers,handleCreateUser,handleGetSingleUser,handleEditSingleUser,handleDeleteUser} = require("../controllers/user")

//Get all users
router.get("/",handleGetAllUsers);

//Create new user 
router.post("/",handleCreateUser);

//Get,edit,delete a single user
router.route("/:id")
.get(handleGetSingleUser)
.patch(handleEditSingleUser)
.delete(handleDeleteUser);

module.exports = router;