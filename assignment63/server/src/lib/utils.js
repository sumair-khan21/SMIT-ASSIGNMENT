const validator = require('validator');


function validateSignup(req) {
    const {
        name,
        email,
        password,
    } = req.body;

    if (!name){
        throw new Error("Name is required")
    }else if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address!")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

}


function validateLogin(req){ 
    const {email, password} = req.body;

    if(!validator.isEmail(email)){
        throw new Error("Invalid Email Address!")
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong enough")
    }

}



module.exports = {
    validateSignup,
    validateLogin
}