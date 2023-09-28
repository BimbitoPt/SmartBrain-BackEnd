const express = require("express");
const cors= require("cors");
const bcrypt = require("bcrypt");

const app = express();

app.use(cors())
app.use(express.json());

const database = {
  user: [
    {
      id: "123",
      name: "John",
      email: "john@example.com",
      password: "password",
      entries: 0,
      joined: new Date(),
    },
    {
      id: "124",
      name: "Sally",
      email: "sally@example.com",
      password: "password",
      entries: 0,
      joined: new Date(),
    },
  ],
};

app.get("/", (req, res) => {
  res.send(database.user);
});

app.post("/signin", (req, res) => {
  if (
    req.body.email === database.user[0].email &&
    req.body.password === database.user[0].password
  ) {
    res.json("sucess");
  } else {
    res.status(400).json("error signing in");
  }
});

app.post("/register", (req, res) => {
  const { email, name, password } = req.body;
  database.user.push({
    id: "125",
    name: name,
    email: email,
    password: password,
    entries: 0,
    joined: new Date(),
  });
  res.json(database.user[database.user.length - 1]);
});

app.get("/profile/:id", (req, res) => {
  const { id } = req.params;
  let found = false;
  database.user.forEach((us) => {
    if (us.id === id) {
      found = true;
      return res.json(us);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.post("/image", (req, res) => {
  const { id } = req.body;
  let found = false;
  database.user.forEach((us) => {
    if (us.id === id) {
      found = true;
      us.entries++  
      return res.json(us.entries);
    }
  });
  if (!found) {
    res.status(404).json("no such user");
  }
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
