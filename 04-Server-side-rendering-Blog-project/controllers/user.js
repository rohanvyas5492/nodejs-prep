const User = require("../models/user");

const handleSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  return res.redirect("/");
}

const handleSignin = async(req,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndCreateToken(email,password);
        return res.cookie("token",token).redirect('/');
    } catch (error) {
        res.render('login',{
            error:"Incorrect Email or password..."
        })
    }
}

module.exports = {
    handleSignup,
    handleSignin,
}