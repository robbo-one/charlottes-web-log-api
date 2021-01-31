const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
    db.getBlogPosts()
    .then(posts => {
        res.json(posts)
    })
})

// REST JSON API Create Route POST /posts
router.post('/', (req,res) => {
    const post = req.body
    console.log(post)
    db.addPost(post)
      .then(id => {
        res.json({ id: id })
      })
  })


  router.post('/:id', (req,res) => {
    const id = req.params.id
    const post = req.body
    db.updatePost(id, post)
      .then(post => {
        res.json({ post: post })
      })
  })


module.exports = router
