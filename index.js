require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");

const whiteList = ['http://127.0.0.1'];
const corsOptions = {
  origin: (origin, callback) => {
    if(!origin || whiteList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200
}

const cors = require("cors");
const app = express();
const port = 3000;
const books = require("./Books");

app.use(express.json());

app.use(cors(corsOptions));

const limiter = rateLimit({
  windowMs: 1000,
  max: 1
});
app.use(limiter);

//test route
app.get("/", (req, res) => {
  res.json({ success: "Hello world!" });
});

app.use("/books", books);

app.listen(port, () => {
  console.log("app listening on " + port);
})

