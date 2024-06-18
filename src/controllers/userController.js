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
    const {email} = req.body; 
    if(email === 'adminCoder@coder.com' && password === 'adminCod3r123'){
      const user = await userDao.register({
        ...req.body,
        role:'admin'
      })
      if (!user) res.status(401).json({ msg: "Usuario ya existe" }); 
      else res.redirect('/views/login')
    } else{
      const user = await userDao.register(req.body);
      if (!user) res.status(401).json({ msg: "Usuario ya existe" }); 
      res.redirect('/views/login')
    }
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
  res.redirect("/views/login");
};
