const { Router } = require("express")
const  { ForgotPassword, ResetPassword, SignIn, SignUp, VerifyUser } = require("../Controllar/UserController.js") ;

const router=Router()

router.post("/sign-up",SignUp)
router.post("/sign-in",SignIn)
router.post("/forgot-password",ForgotPassword)
router.post("/reset-password/:id/:token",ResetPassword)
router.post("/verify",VerifyUser)

module.exports=router