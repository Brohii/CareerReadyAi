import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const interviewSessionSchema = new mongoose.Schema({

interviewSession:{ 
    type:String,
    required:true
},
cvCollection:{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:'CvCollection',
},
jobDescription:{ 
    type:mongoose.Schema.Types.ObjectId,
    ref:'JobDescription',
},
feedback:{ 
    type:String,
    required:true
},
title:{ 
    type:String,
    required:true
},
interview_status:{
type: String,
enum: ['started','finished'],
required: true,
},
interview_level:{
type: String,
enum: ['easy','medium','hard'],
required: true
},
rating:{ 
    type:Number,
    required:true
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
}

  

},{timestamps: true})

interviewSessionSchema.plugin(mongooseAggregatePaginate)


export const InterviewSession = mongoose.model("InterviewSession",interviewSessionSchema)