const express = require('express')
const camelCase = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
  db.getPosts()
    .then(posts => {
      
      posts = posts.map(post => {
        post = camelCase(post)
        post.paragraphs = JSON.parse(post.paragraphs)
        return post
      })
      
      res.json(posts)
    });
});


router.post('/', (req, res) => {
  const post = req.body;
  post.paragraphs = JSON.stringify(post.paragraphs)
  post.date_created = new Date()
  db.addPost(post)
    .then(id => {
      db.getPostById(id[0])
      .then(newPost => {
      res.json(camelCase(newPost))
    });
  })
});

module.exports = router
