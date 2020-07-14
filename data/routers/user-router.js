const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const router = express.Router();
const secrets = require("../secrets");

const User = require("../data-model");

router.post("/register", (req, res) => {
  const userData = req.body;
  const rounds = process.env.HASH_ROUNDS || 12;

  const hash = bcrypt.hashSync(userData.password, rounds);

  userData.password = hash;

  User.addUser(userData)
    .then((userCreated) => {
      res.status(201).json(userCreated);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ errorMessage: "Kayıt sırasında hata oluştu", err });
    });
});

router.post("/login", (req, res) => {
  const userData = req.body;
  const { username, password } = userData;

  User.findByUsername(username)
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ username, token });
      } else {
        res
          .status(401)
          .json({ errorMessage: "Yanlış kullanıcı adı veya şifre!" });
      }
    })
    .catch((error) => {
      res.status(500).json({ errorMessage: "Giriş başarısız!" });
    });
});

function generateToken(user) {
  const payload = {
    id: user.id,
  };

  const secret = secrets.JWT_SECRET;

  const options = {
    expiresIn: "1d",
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
