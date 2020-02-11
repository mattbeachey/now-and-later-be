const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

//general route to return all fields
router.get("/", (req, res) => {
  console.log("is it working")
  User.find({})
  .then(users => res.json(users))
  .catch(err => console.log(err));
})

//route for adding a new saved item to user
router.put("/add/:userId", (req, res) => {
    console.log(req.params.userId, req.body)
    User.where('_id', req.params.userId).update({$push: {"saved_timestamps": req.body}})
    .then( data => {
        console.log(data)
        res.json(data)
    })
    .catch(err => console.log(err));
})

//route to retrieve all saved items of one user
router.get("/get/:userId", (req, res) => {
  console.log("getting all items" + req.params.userId)
  User.findById(req.params.userId)
  .then( data => {
    console.log(data)
    res.json(data)
  })
  .catch(err => console.log(err));
})

//delete array item by id route
router.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id.split("-")[0]
  const userId = req.params.id.split("-")[1]
  try{
    const dbUser = await User.findByIdAndUpdate(
      userId,
      {$pull: {"saved_timestamps" : {_id: itemId}}}
    )
    res.json({message: "working on it"})
  } catch (err) {
    res.json(new Error(err))
  }  

})

module.exports = router;
