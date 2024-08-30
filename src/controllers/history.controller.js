import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { InterviewSession } from "../models/interviewSession.model.js";
import mongoose from 'mongoose'
import { User } from "../models/user.model.js";
//import { User } from "../models/user.model.js";


const userHistory = asyncHandler ( async (req,res)=>{

    
    const user = await User.findById(req.user._id)
    //console.log(interviewe)


//console.log(user)
    const interviews = await InterviewSession.find({user : user._id}).select("-interviewConversation -cvText -jobDescription -interview_status -threadid")
    //const interviews = await InterviewSession.find({  });


     console.log(interviews)

    if (interviews.length === 0) {
        return res.status(404).json({ message: 'No interviews found for this user' });
      }
  
      res.status(200).json(new ApiResponse(200,))



})

export {
    userHistory,
}