import UserDao from '../daos/userDao.js';
import {UserModel} from '../daos/models/userModel.js';

const userDao = new UserDao(UserModel); 

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userDao.login(email, password);
    if (!user) res.status(401).json({ msg: "No estas autorizado" });
    else {
      req.session.email = email;
      req.session.password = password;
      res.redirect('/views/profile')
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const register = async (req, res) =>{
  try{
      const newUser = await userDao.register(req.body);
      if(newUser) res.redirect("/views/login")
        else res.status(401).json({ msg: "Usuario ya existe" });
  }catch (error) {
    throw new Error(error);
  }
}

export const visit = (req, res) => {
  req.session.info && req.session.info.contador++;
  res.json({
    msg: `${req.session.info.username} ha visitado el sitio ${req.session.info.contador} veces`,
  });
};

export const infoSession = (req, res) => {
  res.json({
    session: req.session,
    sessionId: req.sessionID,
    cookies: req.cookies,
  });
};

export const logout = (req, res) => {
  req.session.destroy();
  res.send("Session destroyed");
};
