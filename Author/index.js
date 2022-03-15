const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  if(req.body.author !== '') {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=
    inauthor:${req.body.author}&maxResults=100&key=${process.env.BOOKS_API_KEY}`)
    .then(response => {
      if(response.data.items) {
        if(response.data.items.length > 0) {
          console.log(response.data.items);
          res.json(response.data.items);
        }
      } else {
        res.json({"Response": "No items were found."})
      }
    })
    .catch(err => {
      if(err.request) {
        res.json({"Error": err.request});
      } else {
        res.json({"Error": err.message})
      }
    })
  } else {
    res.json({"Error": "Author required for this route"})
  }
})

module.exports = router;