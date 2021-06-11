const User = require('../models/usermodel')

module.exports.validateData = async function validateData(req, res, next){
    const {name, number} = req.body;
    const phoneNumber = parseInt(number)

    var errors = {name: "", number: ""}
    // var isError = false
    //name validation
    let nameRegex = /^[a-zA-Z ]{2,40}$/;
    let phoneRegex = /^\d{10}$/;
    if(!nameRegex.test(name)){
        // isError = true
        errors.name = "Please enter a name without any numbers or special characters in the range of 2 to 40 characters"
        res.send({success: false, msg: errors})
    }
    //phone number validation
    else if(!phoneRegex.test(phoneNumber)) {
        // isError = true
        errors.number = "Please enter a valid 10 digit number"
        res.send({success: false, msg: errors})
    }
    else {
    // async function checkForUserinDB(){
        try{
            console.log(name, number)
            const dbUser = await User.find({name, number})
            if(dbUser && dbUser?.length !== 0){
                console.log(dbUser)
                // if(!isError) {
                    // isError = true
                    errors = {name: "User with the same name and number exists", number: "User with the same name and number exists"}
                    res.send({success: false, msg: errors})
                // }
            }
            else {
                next()
            }
        } catch(err){
            console.log(err)
        }
    // }

    // await checkForUserinDB()
    // if(isError){
    //     res.send({success: false, msg: errors})
    // }
    // else{
    //     next()
    // }
    }
}