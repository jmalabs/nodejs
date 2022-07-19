const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const userRouter = require("./routers/user.router");
const taskRouter = require("./routers/task.router");

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("app is running on port " + port);
});

// const asyncHandler = (fn) => (req, res, next) => {
//   return Promise.resolve(fn(req, res, next)).catch(next);
// };
// process.on("uncaughtException", (error) => {
//   console.log("uncaughtException", error);
// });

// app.use((err, req, res, next) => {
//   console.log("Something broke!", err.stack);
//   res.status(500).send(err);
// });
