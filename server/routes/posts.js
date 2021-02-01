const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
  db.getBlogPosts()
    .then(posts => {
      const allPosts = posts.map(post => {
        post.paragraphs = JSON.parse(post.paragraphs)
        return post
      })
      res.json(allPosts)
    })
})

// REST JSON API Create Route POST /posts
router.post('/', (req, res) => {
  const post = req.body
  post.dateCreated = new Date().toISOString().slice(0, 10)
  db.addPost(post)
    .then(id => {
      db.getPost(id)
        .then(post =>
          res.json(post)
        )
    })
})


router.patch('/:id', (req, res) => {

  //this selects the id from the url
  const id = req.params.id
  const post = req.body

  //we are updating the post which has the same ID as the url and updating that post with the info from req.body
  db.updatePost(id, post)
    //what is returned after .then is the amount of objects update which is 1, but IDGAF about that number, I just want to return the post which is updated
    .then(post => {
      // we still have the id of the post we updated (req.params.id) so we just want to return the post which was updated by searching for that ID
      db.getPost(id)
        .then(post => {
          //then we send the updated post as json
          res.json(post)
        })
    })
})


router.post('/:id', (req, res) => {

  const id = req.params.id

  db.deletePost(id)
    .then(post => {
      res.json("OK")
    })
})
module.exports = router
