//This is where API functions are written

const express = require('express')
const db = require('../db/db')
const router = express.Router()

// put routes here
// REST JSON API Index Route GET /posts
//  /v1/posts

//No req, just a response
router.get('/', (req,res) => {
  db.getPosts()
    .then(posts => {
      // res.send(JSON.stringify(posts))
      res.json(posts)
    })
})

//req is in req body
router.post('/', (req,res) => {
  db.addPost(req.body)
    .then(id => {
    db.getPostById(id)
    .then (post => {
    res.json(post) //pass Post to client
    })
})
})

//Patch route request to update post. Req body includes id, title and para
router.patch('/:id', (req,res) => {
  db.updatePost(req.params.id, req.body)//form only has title and content
  .then(() => {
  db.getPostById(req.params.id)//reselects updated rec from db
  .then (post => {
    res.json(post)
  })}
)}
)
  
//Delete an existing blog post. id provided from url
router.delete('/:id', (req,res) => {
  id = req.params.id
  db.deletePost(id) 
  .then(() => {
    res.json({})//returns empty object
  }
  )
})





module.exports = router
