import * as services from "../services/userServices.js";

export const registerResponse = (req, res, next) => {
  try {
    res.json({
      msg: "Register OK",
      session: req.session,
    });
  } catch (error) {
    next(error);
  }
};

export const loginRespone = async (req, res, next) => {
  try {
    let id = null;
    if (req.session.passport && req.session.passport.user)
      id = req.session.passport.user;
    const user = await services.getUserById(id);
    if (!user) res.status(401).json({ msg: "Error de autenticacion" });
    const { first_name, last_name, email, age, role } = user;
    res.json({
      msg: "Login OK",
      user: {
        first_name,
        last_name,
        email,
        age,
        role,
      },
    });
  } catch (error) {
    next(error);
  }
};


export const githubResponse = async (req, res, next) =>{
  try{
    console.log(req.user);
    const { first_name, last_name, email, age, role } = req.user;
    res.json({
      msg: "Login con Github OK",
      user: {
        first_name,
        last_name,
        email,
        role,
      },
    });
  }catch(error){
    next(error)
  }
}
