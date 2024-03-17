const {Router} = require("express");
const User = require("../models/user");
const {handleSignup,handleSignin} = require("../controllers/user");

const router = Router();

router.get("/signup",(req,res)=>{
    return res.render('signup');
});

router.get("/login",(req,res)=>{
    return res.render('login');
});

router.post("/signup",handleSignup);

router.post('/login',handleSignin);

router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
})

module.exports = router;
