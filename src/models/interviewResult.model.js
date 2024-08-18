import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const interviewResultSchema = new mongoose.Schema({

interview:{ 
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
rating:{ 
    type:String,
    required:true
},
user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
}

  

},{timestamp: true})

interviewResultSchema.plugin(mongooseAggregatePaginate)


export const InterviewResult = mongoose.model("InterviewResult",interviewResultSchema)