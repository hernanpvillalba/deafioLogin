import { Router } from "express";
import{
  registerResponse,
  loginRespone,
  githubResponse,
} from "../controllers/userController.js"
import passport from "passport";
import { isAuth } from "../middlewares/isAuth.js";

const router = Router();

router.post("/register",passport.authenticate('register'), registerResponse);
router.post("/login",passport.authenticate('login'), loginRespone);
router.get("/private", isAuth, (req, res)=>res.json({msg:'Ruta privada'}))

router.get("/register-github", passport.authenticate('github', {scope:['user:email']}))

router.get("/products", passport.authenticate('github', {scope:['user:email']}), githubResponse)

export default router;
