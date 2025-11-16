import { Router } from "express";
import Signup from "../controllers/SignupController.js"
import Lo from "../controllers/LoControllers.js";
// import { verify } from "jsonwebtoken";
import VerifyUser from "../controllers/VerifyUserController.js";

const adRouter = Router()

adRouter.post("/signup", Signup)
adRouter.post("/login", Lo)
adRouter.get("/verify", VerifyUser)


export default adRouter