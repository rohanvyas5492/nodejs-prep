const JWT = require("jsonwebtoken");

const secret = "DarkKnight";

const createTokenForUser = function(user){
    const payload = {
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        profileImageUrl:user.profileImageUrl,
        role:user.role,
    }
    const token = JWT.sign(payload,secret);
    return token;
}

const validateToken = function(token){
    const payload = JWT.verify(token,secret);
    return payload;
}

module.exports = {
    createTokenForUser,
    validateToken,
}