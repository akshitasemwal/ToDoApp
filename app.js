//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();

// set up middleware
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));

//connect to DB
mongoose.connect("mongodb+srv://AkshitaSemwal:Itmz2502@cluster0.jvty75a.mongodb.net/test", {useNewUrlParser: true})
.then(()=>{
  console.log("connection successful!");
});

// create taskSchema
const taskSchema = {
  task: String,
  priority: Number,
  status: { type: String, default: "pending" },
};

const Task = mongoose.model("Task", taskSchema);

// create userSchema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

let deleted = 0;

// Signup function to create new user
app.post("/signup", async function (req, res) {
  const password= req.body.password;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({
    email: req.body.email,
    password: hashedPassword
  });

  user.save()
    .then(task => {
      res.redirect("/login");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Unable to save task to database");
    });
});

// Login function to authenticate user and generate JWT token
app.post('/login', function(req, res) {
  const { email, password } = req.body;

  User.findOne({ email }).then(user => {
    if (!user) {
      res.status(400).send( 'Invalid email or password');
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) {
        res.status(400).send( 'Invalid email or password');
      }
      const payload = {
        id: user.id,
        email: user.email
      };

      jwt.sign(payload, 'secretkey', { expiresIn: '1h' }, (err, token) => {
        if (err) {
          console.log(err);
          res.status(400).send('Internal server error');
        }

        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 });
        res.redirect('/tasks');
      });
    });
  }).catch(err => {
    console.log(err);
    res.status(400).send('Internal server error');
  });
});

// login page route
app.get("/login", function(req, res){
  res.render("login");
});

// signup page route
app.get("/signup", function(req, res){
  res.render("signup");
});

// home page route
app.get("/tasks", function (req, res) {
  Task.find({})
    .sort([[ 'status', -1 ], ['priority', 1]])
    .then((tasks) => {
      let pending = 0;
      let completed = 0;
      let canceled = 0;

      tasks.forEach(function (task) {
        if (task.status === "pending") {
          pending++;
        } else if (task.status === "completed") {
          completed++;
        } else if (task.status === "canceled") {
          canceled++;
        } else if (task.status === "deleted") {
          deleted++;
        }
      });

      res.render("tasks", {
        tasks: tasks,
        pending: pending,
        completed: completed,
        canceled: canceled,
        deleted: deleted,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send("Error retrieving tasks");
    });
});

// add task route
app.post("/tasks", function (req, res) {
  const task = new Task({
    task: req.body.task,
    priority: req.body.priority,
    status: req.body.status
  });

  task.save()
    .then(task => {
      res.redirect("/tasks");
    })
    .catch(err => {
      console.error(err);
      res.status(500).send("Unable to save task to database");
    });
});

// delete task route
app.get("/delete/:id", function (req, res) {
  deleted++;
  Task.findByIdAndDelete(req.params.id).then(() => {
    res.redirect("/tasks");
  });
});

// route to update the status of a task
app.post('/tasks/:id/status', function(req, res) {
  const taskId = req.params.id;
  const status = req.body.status;

  Task.findOneAndUpdate({_id: taskId}, {status: status}, {new: true}).then(updatedTask => {
    res.redirect('/tasks');
  }).catch(err => {
    console.log(err);
    res.status(400).send('Error updating task status');
  });
});

// start server
app.listen(3001, () => {
  console.log("Server is up on port 3001");
});
