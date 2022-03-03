const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  if(req.body.isbn !== '') {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=
    isbn:${req.body.isbn}&key=${process.env.BOOKS_API_KEY}`)
    .then(response => {
      console.log(response.data.items[0]);
      res.json(response.data.items[0]);
    })
    .catch(err => {
      if(err.request) {
        res.json({"Error": err.request});
      } else {
        res.json({"Error": err.message})
      }
    })
  } else {
    res.json({"Error": "ISBN required for this route"})
  }
})

module.exports = router;