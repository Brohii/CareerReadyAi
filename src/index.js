import dotenv from 'dotenv'
import connectDB from './db/index,js'
import {app} from './app'

dotenv.config({
    path: "./.env"
}
)

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000 , ()=>{
    console.log("App is listening on port : ", process.env.PORT);
    })


    app.on("error",(err)=>{console.log("DB Connection FAILED ERROR !!! ",err);
    throw err
    })


}
).catch((error)=>{
    console.log(" DB Connection FAILED !!! ",error);
    
})



