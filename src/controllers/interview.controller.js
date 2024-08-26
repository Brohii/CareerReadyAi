
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { CvCollection } from "../models/cvCollection.model.js";
import OpenAI from "openai";



const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,});



const startInterviewSession = asyncHandler(async (req,res)=>{


    
    const {cvID, jobDescription, complexity } = req.body;
    let {cvText} = req.body


    if (!jobDescription || !complexity) {
        return res.status(400).json({ message: "jobDescription or Complexity are missing" });
    }

    if(!cvID && !cvText){
        return res.status(400).json({ message: "There should either be cvText or cvID to start the interview" });
    }

    if(cvID){
    const cvDocument = await CvCollection.findById(cvID)
    cvText = cvDocument.cvText
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^ CV AND JOB RELEVANCY CHECK ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    const checkCvAndJobRelevancy = [
      {
        role: "user",
        content: `Please review the following CV and job description. 
                  - If the CV matches the job description, return: { "match": true, "suggestion": "" } 
                  - If the CV does not match the job description, return: { "match": false, "suggestion":  suggestion the user for other positions the user should consider based on the CV in suggestion } 
                  
                  CV: ${cvText}
                  
                  Job Description: ${jobDescription}`,
      },
    ];
  
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: checkCvAndJobRelevancy,
      max_tokens: 250
    });
    console.log(response.choices[0].message.content)
    const modelResponse= response.choices[0].message.content;
    const matchResult = JSON.parse(modelResponse);
    console.log(matchResult)

    if (!matchResult.match) {
        return res.status(200).json(new ApiResponse (200,{matchResult},"The user CV doesn't Match with the Job Description"));
    }

    const interviewAssitant = await openai.beta.assistants.retrieve("asst_ZUMZ7F2seIdfypMrNMXi5Y7w")
    console.log(interviewAssitant)














  
})







export {
    startInterviewSession,
}