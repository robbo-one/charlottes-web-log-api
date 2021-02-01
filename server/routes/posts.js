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
  const id = req.params.id
  const post = req.body
  db.updatePost(id, post)
    .then(post => {
      db.getPost(id)
        .then(post => {
          res.json(post)
        })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.deletePost(id)
    .then(() => {
      res.json("Ok")
    })
})

router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  db.getComments(postId)
  .then(comments => {
    res.json(comments)
  })
})

router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  db.getComments(postId)
  .then(comments => {
    res.json(comments)
  })
})

router.post('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  const comment = req.body.comment
  db.addComment(comment, postId)
  .then(id => {
    db.getComment(id[0])
        .then(comment =>
          // console.log(comment)
          res.json(comment)
        )
  })
})



module.exports = router
