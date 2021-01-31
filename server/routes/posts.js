const express = require('express')
const router = express.Router()
const camelCase = require('camelcase-keys')

const db = require('../db/db')

// put routes here

router.get('/', (req,res) => {
  db.getPosts()
    .then(posts => {
      const postData = posts.map(post => {
        post.paragraphs = JSON.parse(post.paragraphs)
        return post
      })
      res.json(camelCase(postData))
    })
})

router.post('/', (req,res) => {
  const post = req.body
  post.paragraphs = JSON.stringify(post.paragraphs)
  post.date_created = new Date()
  db.addPosts(post)
    .then(id => {
      db.getPostId(id[0])
      .then(newPost => {
          console.log(newPost)
          res.json(camelCase(newPost))
        })
    })
})

router.patch('/:id', (req,res) => {
  
})

module.exports = router
