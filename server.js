const express = require("express");
const app = express();
const port = 5000;

app.get("/users", (req, res) => {
  const accounts = [
    { username: "john", password: "iofmrfm404", id: 0 },
    { username: "mary", password: "iof21304", id: 1 },
    { username: "charlie", password: "iof1235404", id: 2 },
  ];
  res.json(accounts);
});

app.listen(port, () => {
  console.log(`Listening at port ${port}.`);
});
