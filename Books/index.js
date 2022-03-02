const express = require("express");
const router = express.Router();
const axios = require("axios");

const fetchBook = async (searchText, searchParameter, parameter) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${searchText}
  +${searchParameter}:${parameter}&key=${process.env.BOOKS_API_KEY}`
};

router.get("/", async (req, res) => {
  const bookStream = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=
  isbn:9780575097469&key=${process.env.BOOKS_API_KEY}`)
  .then(response => {
    console.log(response.data.items[0])
    res.json(response.data.items[0]);
  });
  
});



module.exports = router;