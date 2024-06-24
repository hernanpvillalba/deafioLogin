import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import userRouter from "./routes/userRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import MongoStore from "connect-mongo";
import { initMongoDB } from "./db/database.js";
import { __dirname } from "./utils.js";
import 'dotenv/config';
import passport from "passport";
import './passport/localStartegy.js'
import './passport/githubStrategy.js'

const storeConfig = {
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    crypto: { secret: process.env.SECRET_KEY },
    ttl: 180,
  }),
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 180000,
  },
};

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(storeConfig));

app.use(passport.initialize());
app.use(passport.session());

initMongoDB();

app.use("/users", userRouter);

const PORT = 8080
app.listen(PORT, () => console.log(`Server OK puerto ${PORT}`));
