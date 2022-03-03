const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/", async (req, res) => {
  if(req.body.title !== '') {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=
    intitle:${req.body.title}&key=${process.env.BOOKS_API_KEY}`)
    .then(response => {
      console.log(response.data.items[0]);
      res.json(response.data.items[0]);
    })
    .catch(err => res.json({"Error": err}))
  } else {
    res.json({"Error": "Title required for this route"})
  }
})

module.exports = router;