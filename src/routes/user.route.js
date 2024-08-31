import { Router } from "express";
import { registerUser,loginUser,logoutUser,loggedinuUserAccessible } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router()
router.route("/register").post(upload.none(),registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)


    
export default router