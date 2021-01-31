//This is where API functions are written

const express = require('express')
const db = require('../db/db')
const router = express.Router()

// put routes here
// REST JSON API Index Route GET /posts
//  /v1/posts

router.get('/', (req,res) => {
  db.getPosts()
    .then(posts => {
      // res.send(JSON.stringify(posts))
      res.json(posts)
    })
})

router.post('/', (req,res) => {
  db.addPost(req.body)
    .then(id => {
    db.getPostById(id)
    .then (post => {
    res.json(post) //pass Post to client
    })
})
})






module.exports = router
