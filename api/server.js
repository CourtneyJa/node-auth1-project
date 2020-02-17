const session = require("express-session");
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const connectSess = require("connect-session-knex");
const authRouter = require("../auth/auth-router.js");
const userRouter = require("../users/user-router.js");
const db = require("../data/dbconfig");

const KnexSessionStore = connectSess(session);

const sessionOpts = {
  name: "macadamian",
  secret: "white chocolate macadamian nut are the best",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionOpts));
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("I got it!");
});

module.exports = server;
