const express = require("express");
const Task = require("../models/task.model");
var mongoose = require("mongoose");
const router = express.Router();

router.post("/tasks", (req, res) => {
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

router.get("/tasks", (req, res) => {
  Task.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

router.get("/tasks/:id", (req, res) => {
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

module.exports = router;
