import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router()
import { upload } from "../middlewares/multer.middleware.js";

router.route("/register").post(
    upload.single('cv'),registerUser)

export default router