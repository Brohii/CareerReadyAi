import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { startInterviewSession } from "../controllers/interview.controller.js";

const router = Router()

router.route("/interview-session").post(verifyJWT, startInterviewSession)



export default router