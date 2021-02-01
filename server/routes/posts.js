const express = require('express')
const camelCase = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
  db.getPosts()
  .then(posts => {
    const postData = posts.map(post => {
      post.paragraphs = JSON.parse(post.paragraphs)
      return post
    })
    res.json(camelCase(postData))
  })
})

router.post('/', (req, res) => {
  const post = req.body
  db.addPost({title: post.title, paragraphs : JSON.stringify(post.paragraphs), date_created : new Date()})
  .then(id => {
    db.getPost(id[0])
    .then(p => {
      p.paragraphs = JSON.parse(p.paragraphs)
      // console.log(p)
      res.json(camelCase(p))
    })
  })
})

router.patch('/:id', (req, res) => {
  const id = req.params.id
  const post = req.body
  // console.log(post)
  db.updateBlogPost(id, post.title, JSON.stringify(post.paragraphs))
  .then(() => {
    db.getPost(id)
    .then(p => {
      // console.log(p)
      p.paragraphs = JSON.parse(p.paragraphs)
      res.json(camelCase(p))
    })
  })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  db.deletePost(id)
  .then(() => {
    // res.json({})
    res.sendStatus(200)
  })
})

router.get('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  db.getComments(postId)
  .then(comments => {
    res.json(camelCase(comments))
  })
})

router.post('/:postId/comments', (req, res) => {
  const postId = req.params.postId
  const comment = req.body.comment
  // console.log(comment)
  db.addComment(postId, comment)
  .then(id => {
    db.getComment(id[0])
    .then(comment => {
      res.json(camelCase(comment))
    })
  })

})




module.exports = router

