require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;

const ISBN = require("./ISBN");
const Author = require("./Author");
const Title = require("./Title");
const AuthorAndTitle = require("./AuthorAndTitle");

app.use(express.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 1000,
  max: 1
});
app.use(limiter);

//test route
app.get("/", (req, res) => {
  res.json({ success: "Hello world!" });
});

app.use("/isbn", ISBN);
app.use("/author", Author);
app.use("/title", Title);
app.use("/authorandtitle", AuthorAndTitle);

app.listen(PORT, () => {
  console.log(`app listening on port: ${PORT}`);
});