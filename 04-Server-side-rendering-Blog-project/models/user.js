const {Schema, model} = require("mongoose");
const {createHmac, randomBytes} = require('crypto');
const { createTokenForUser } = require("../services/auth");

const userSchema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl:{
        type:String,
        default:'/images/default-profile.png',
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    }
},{timestamps:true});

//Hashing password before saving
userSchema.pre('save',function(next){
    if (!this.isModified('password')) {
        return next();
    }
    try {
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = createHmac('sha256', salt).update(this.password).digest('hex');
        this.salt = salt;
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

//Creating a function to verify hashed password when signing in
userSchema.static('matchPasswordAndCreateToken',async function(email,password){
    const user = await this.findOne({email});
    if(!user) throw new error('User not found...'); 
    const hashedPassword = createHmac('sha256',user.salt).update(password).digest('hex');
    if(hashedPassword !== user.password) throw new error('Incorrect password...');
    const token = createTokenForUser(user);
    return token;
});

const User = model("user", userSchema);

module.exports = User;