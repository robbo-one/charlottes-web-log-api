const express = require('express')
const toCamelCase = require('camelcase-keys')

const db = require('../db/db')
const utils = require('../utils')
const router = express.Router()

// put routes here

router.get('/',(req,res) => { 
  db.getPosts()
  .then(posts => {
    const postParse = posts.map(post => {
      post.paragraphs = JSON.parse(post.paragraphs)
      return post
    })
    // console.log(posts)
    res.json(utils.toCamelCase(postParse))
  })
})

router.post('/',(req,res) => {
  const post = req.body
  post.paragraphs = JSON.stringify(post.paragraphs)
  post.date_created = new Date()

  db.addPost(post)
    .then(id => {
      db.getPost(id[0])
      .then(newPost => {
        res.json(toCamelCase(newPost))
      })
    })
})

router.patch('/:id',(req, res) => {
  const id = req.params.id
  const post = req.body
  post.paragraphs = JSON.stringify(post.paragraphs)

  db.updatePost(id, post.title, post.paragraphs)
  
  .then(()=> {
    db.getPost(id)
    .then(newPost => {
      console.log(newPost)
      res.json(toCamelCase(newPost))
    
    })
  })
})



module.exports = router
