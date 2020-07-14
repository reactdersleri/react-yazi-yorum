const express = require("express");
const router = express();
const cors = require("cors");
const helmet = require("helmet");

router.use(express.json());
router.use(cors());
router.use(helmet());

const postRouter = require("../data/routers/post-router");
const userRouter = require("../data/routers/user-router");

router.use("/posts", postRouter);
router.use("/", userRouter);

router.get("/", (req, res) => {
  res.status(200).json({ server: "up" });
});

module.exports = router;
