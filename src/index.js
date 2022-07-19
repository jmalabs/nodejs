const express = require("express");
require("./db/mongoose");
const User = require("./models/user.model");
const Task = require("./models/task.model");
var mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const asyncHandler = (fn) => (req, res, next) => {
  return Promise.resolve(fn(req, res, next)).catch(next);
};
app.post(
  "/users",
  asyncHandler(async (req, res, next) => {
    const user = new User(req.body);
    // try {
    await user.save();
    res.status(201).send(user);
    // } catch (error) {
    //   // next(error);
    //   // res.status(400).send(error);
    // }
  })
);

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(200).send({});
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/tasks", (req, res) => {
  const task = new Task(req.body);
  task
    .save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

app.get("/tasks", (req, res) => {
  Task.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/tasks/:id", (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.send({});
  }

  Task.findById(id)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// process.on("uncaughtException", (error) => {
//   console.log("uncaughtException", error);
// });

app.use((err, req, res, next) => {
  console.log("Something broke!", err.stack);
  res.status(500).send(err);
});
app.listen(port, () => {
  console.log("app is running on port " + port);
});
