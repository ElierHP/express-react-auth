module.exports.userData = (req, res) => {
  const accounts = [
    { username: "john", password: "iofmrfm404", id: 0 },
    { username: "mary", password: "iof21304", id: 1 },
    { username: "charlie", password: "iof1235404", id: 2 },
  ];
  res.json(accounts);
};
