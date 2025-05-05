const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];
const JWT_SECRET = "This-is-a-secret"

function generateToken() {
  const characters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  let token = "";

  for (let i = 0; i < characters.length; i++) {
    token += characters[Math.floor(Math.random() * characters.length)];
  }
  return token;
}

app.get("/me", (req, res) => {

  const token = req.headers.token;

  const decodedInfo = jwt.verify(token,JWT_SECRET)

  const username = decodedInfo.username

  const user = users.find((u) => username === u.username);

  if (user) {
    res.send(user);
  } else {
    res.status(404).send("user not found");
  }
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  users.push({
    username,
    password,
  });

  console.log(users);
  res.json({
    msg: "User signed up successfully",
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = users.find((u) => u.username === username);

  if (user) {
    // const userToken = generateToken();
    // user.token = userToken;

    
    res.send(jwt.sign({username},JWT_SECRET));
  } else {
    res.status(404).send("user not found");
  }

  console.log(users);
});

app.listen(3000);
