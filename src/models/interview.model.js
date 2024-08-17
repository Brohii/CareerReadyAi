import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const interviewSchema = new mongoose.Schema({

interview:{ 
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

interviewSchema.plugin(mongooseAggregatePaginate)


export const Interview = mongoose.model("Interview",interviewSchema)