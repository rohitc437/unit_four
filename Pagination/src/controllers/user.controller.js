const express = require("express");
const router = express.Router();
const User = require("../models/users.model");
const transporter = require("../configs/mail");

const admin = [
  "raj@baba.com",
  "sham@baba.com",
  "baba@baba.com",
  "kaka@baba.com",
  "dada@baba.com",
];

router.get("", async function (req, res) {
  const page = +req.query.page || 1;
  const size = +req.query.size || 10;
  const offset = (page - 1) * size;

  const users = await User.find().skip(offset).limit(size).lean().exec();
  const totalusercount = await User.find().countDocuments();
  const totalpages = Math.ceil(totalusercount / size);

  return res.send({ users, totalpages, total: totalusercount });
});


router.get("/signup", async function (req, res) {
  res.render("users/signup");
});
router.post("/signup", async function (req, res) {
  const user = new User(req.body);
  const result = await user.save();

  let message = {
    from: "rohit@164masai.com",
    to: user.email,
    subject: ` Welcome  ${user.first_name} ${user.last_name}`,
    text: ` Hey ${user.first_name}, confirm your email `,
  };

  transporter.sendMail(message);

  admin.forEach((email) => {
    let message = {
      from: "rohit@164masai.com",
      to: email,
      subject: `${user.first_name} ${user.last_name}  registered on our site`,
      text: ` ${user.first_name} ${user.last_name}`,
    };

    transporter.sendMail(message);
  });

  return res.send(result);
});

module.exports = router;
