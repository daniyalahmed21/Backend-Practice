const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();

app.use(express.json());

const users = [];
const JWT_SECRET = "This-is-a-secret";

function auth(req, res, next) {
  const token = req.headers.token;
  const decodedInfo = jwt.verify(token, JWT_SECRET);
  const decodedUsername = decodedInfo.username;
  if (decodedUsername) {
    req.username = decodedUsername;
    next();
  } else {
    res.json({
      message: "You are not logged in ",
    });
  }
}

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/public/index.html")
})
app.get("/me", auth, (req, res) => {
  const username = req.username
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
    res.send(jwt.sign({ username }, JWT_SECRET));
  } else {
    res.status(404).send("user not found");
  }
  console.log(users);
});

app.listen(3000);
