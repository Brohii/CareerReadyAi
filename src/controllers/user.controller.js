import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
 const registerUser =  asyncHandler(async (req,res)=>{


    // get user data from frontend
    const {username, email, password} = req.body
   // console.log("user email is: ",email)


        // validate the data from user   
    if([username,email,password].some((field)=>field?.trim === "")){
        throw new ApiError(400, "All fields are required")
    }   

    
    // check if the user already exists
    const existedUser = User.findOne(email)

    if(existedUser){
        throw new ApiError(409,"User Already Exists with this Email")
    }
    // created user object, create db entry
    const user = await User.create({
        username: toLowerCase(),
        email,
        fullName: fullName ?? "",
        password,
    })

    //remove password from response
    const createdUser = await User.findById(user._id.select("-password"))

    //check for user response
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    // return response
    return res.status(201).json(
       new ApiResponse(200, createdUser,"User Registered Successfully")
    )
})

export {registerUser}