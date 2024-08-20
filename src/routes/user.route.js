import { Router } from "express";
import { registerUser,loginUser,logoutUser,loggedinuUserAccessible } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()
router.route("/register").post(upload.single('cv'),registerUser)

router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/cv").post(verifyJWT,loggedinuUserAccessible)


    
export default router