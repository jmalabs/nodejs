const express = require("express");
require("./db/mongoose");

const app = express();

app.use(express.json());

const userRouter = require("./routers/user.router");
const taskRouter = require("./routers/task.router");

app.use(userRouter);
app.use(taskRouter);

module.exports = app;
