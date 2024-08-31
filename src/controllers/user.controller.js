import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
const generateAccessTokens = async(userId)=>{
    try{
        await User.findById(userId)
         const accessToken = await User.generateAccessTokens()

         return(accessToken)


    }
    catch(error){
        throw new ApiError(500,"Something went wrong while generating Access Token")


        }
}


 const registerUser =  asyncHandler(async (req,res)=>{


    // get user data from frontend
    const {username, email, password,fullName} = req.body
   // console.log("user email is: ",email)
    console.log(username, email, password,fullName)

        // validate the data from user   
    if( [username,email,password].some((field)=>field?.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }   

    
    // check if the user already exists
    const existedUser = await User.findOne({email})

    if(existedUser){
        throw new ApiError(409,"User Already Exists with this Email")
    }
    // created user object, create db entry
    const user = await User.create({
        username: username.toLowerCase(),
        email: email.toLowerCase(),
        fullName: fullName ? fullName: "",
        password,
    })

    //remove password from response
    const createdUser = await User.findById(user._id).select("-password")
    

    //check for user response
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    // return response
    return res.status(201).json(
       new ApiResponse(200, createdUser,"User Registered Successfully")
    )
})

const loginUser = asyncHandler(async (req, res)=>{

const {username, email, password} = req.body
if(!username && !email){
    throw new ApiError(400, "username or email is required")
}

const user = await User.findOne({
    $or: [{username},{email}]
})

if(!user){
    throw new ApiError(400, "User doesn't Exist")
}

const isPasswordValid =   await user.isPasswordCorrect(password)

if(!isPasswordValid){
throw new ApiError(401,"Invalid User Credentials")
}


const accessToken = await user.generateAccessToken(user._id)


const loggedInUser = await User.findById(user._id).select("-password")

const options = {
    httpOnly: true,
    secure: true
}

return res.status(200)
.cookie("accessToken", accessToken, options)
.json(
    new ApiResponse(200,{user: loggedInUser , accessToken },"User Logged In Successfully" )
)

})

const logoutUser = asyncHandler(async(req,res)=>{

    const options = {
        httpOnly: true, 
        secure: true,   
        sameSite: 'Strict', 
        path: '/' 
    };
    
res.status(200)
.clearCookie("accessToken", options)
.json(
    new ApiResponse(200,"A user loggedout successfully")
)
})

const changeUserPassword = asyncHandler(async(req,res)=>{

    const {oldPassword, newPassword} = req.body

     const user = await User.findById(req.user._id)

     const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
    
     if(!isPasswordCorrect){
        throw new ApiError(400,"Incorrect Password")
     }


     user.password = newPassword
    await user.save({validateBeforeSave: false})

    return res
    .status(200)
    .json(new ApiResponse(200,{},"Password Changed Successfully"))
})

const userDetailsUpdate = asyncHandler(async(req,res)=>{

    const {email, fullName, username} = req.body

    if(!email || !fullName || !username){
        throw new ApiError(401,"Fill any of the fields to update! ")
    }

   await User.findByIdAndUpdate(req.user._id,
    {
        $set:{
            fullName,
            email,
            username
        }
    }
    ,{new: true}
   ).select("-password")

   return res
   .status(200)
   .json( new ApiResponse(200,{},"Account Details Updated Successfully"))


})




const loggedinuUserAccessible = asyncHandler(async(req,res)=>{

    res.status(200).json(
        new ApiResponse(200,req.user,"Secured Route")
    )


})

export {
    registerUser,
    loginUser,
    logoutUser,
    loggedinuUserAccessible,
    changeUserPassword,
    userDetailsUpdate
}