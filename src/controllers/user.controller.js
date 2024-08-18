import { asyncHandler } from "../utils/asyncHandler.js";



 const registerUser =  asyncHandler(async (req,res)=>{

    res.status(200).json({
        message:"ok"
    } )

    // get user data from user
    // validate the data from user
    // check if the user already exists or not
    // create a db entry
    // return response

})

export {registerUser}