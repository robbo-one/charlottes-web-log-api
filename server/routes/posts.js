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

module.exports = router

