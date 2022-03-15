const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  if(req.body.isbn !== '') {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=
    isbn:${req.body.isbn}&key=${process.env.BOOKS_API_KEY}`)
    .then(response => {
      if(response.data && response.data.items) {
        res.json(response.data.items);
      }
    })
    .catch(err => {
      res.json({"Error": "No items were found."})
    })
  } else {
    res.json({"Error": "Author required for this route"})
  }
})

module.exports = router;