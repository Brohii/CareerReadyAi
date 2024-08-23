
import { CvCollection } from "../models/cvCollection.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import {extractTextFromPDF} from "../utils/pdftotext.js"
import fs from 'fs'


const listcvfiles = asyncHandler(async(req,res)=>{

       const userId = req.user._id

      
       const cvEntries = await CvCollection.find({ user: userId });

        if (!cvEntries.length) {
            return res.status(404).json({ message: 'No CVs found for this user' });
        }

        const cvFilePaths = cvEntries.map(cv => cv.cvFileUrl);

        return res.status(200).json({ cvFilePaths });

})

const uploadCvFile = asyncHandler(async(req,res)=>{
    
    const userId = req.user._id
    const {tempCvText} = req.body
    
    
    
        if (!req.file && !tempCvText) {
        return res.status(400).json({ message: 'Please provide CV content or upload your cv to start the interview' });
        }

     try {
    
        if (tempCvText && !req.file){
            res.status(200).json( new ApiResponse(200,
                {cvText :tempCvText}, " cv content is given using cvText"))
        }else if(req.file && !tempCvText){
            const cvLocalPath = req.file.path

            const filePath = cvLocalPath;
        
        
            const cvContent = await extractTextFromPDF(filePath)
        

        // Fetch all CVs for the user, sorted by creation date (oldest first)
            const cvEntries = await CvCollection.find({ user: userId }).sort({ createdAt: 1 });

            if (cvEntries.length >= 5) {
            // If there are already 5 CVs, delete the oldest one (FIFO)

            
            const oldestCv = cvEntries[0];
            const oldestCvPath = oldestCv.cvFileUrl;

                try {
                // Delete the file from the server
                await fs.unlinkSync(oldestCvPath);
                } catch (err) {
                console.error(`Failed to delete file: ${oldestCvPath}`, err);
                }

            // Delete the entry from the database
                await CvCollection.findByIdAndDelete(oldestCv._id);
            
            }


        
            const newCvEntry = await CvCollection.create({    
            cvFileUrl: cvLocalPath,
            user: userId,
            cvText: cvContent
            })
        
            res.status(200).json(new ApiResponse(200,{cvFileUrl: newCvEntry.cvFileUrl}," CV file uploaded successfully"))

            }
        else{
            res.status(500).json({message:"both inputs were given"})
        }
        }
        
        
        catch(error) {

        console.log(error)
        res.status(401).json( new ApiResponse(500,{}," File Failed to upload"))
        }
    })




    const submitCvText = asyncHandler((req,res)=>{

        const { text } = req.body;
    
      if (!text) {
        return res.status(400).send('No CV text provided.');
      }
    
      
    
    
    })
        export {
    listcvfiles,
    uploadCvFile

    }