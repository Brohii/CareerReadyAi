import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { userHistory } from "../controllers/history.controller.js";
const router = Router()

router.route("/user-history").get(verifyJWT, userHistory)
//router.route("/detailed-user-history").post(verifyJWT, interviewSession)


export default router