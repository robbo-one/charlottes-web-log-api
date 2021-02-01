const express = require('express')
const camelcaseKeys = require('camelcase-keys')

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
      res.json(camelcaseKeys(postData))
    })
})

router.get('/:id', (req, res) => {
  db.getPost(req.params.id)
    .then(post => {   
      post.paragraphs = JSON.parse(post.paragraphs) 
      res.json(camelcaseKeys(post))
    })
})

router.post('/', (req, res) => {
  const post = req.body
  console.log(post)
  post.paragraphs = JSON.stringify(post.paragraphs)
  post.date_created = new Date()
  db.addPost(post)
    .then(id => {


      db.getPost(id)
        .then(post => {
          post.paragraphs = JSON.parse(post.paragraphs)
          res.json(camelcaseKeys(post))
        })     
    })
})

router.patch('/:id', (req, res) => {
  const paragraph = JSON.stringify(req.body.paragraphs)
  post.date_edited = new Date()
  const editPost = {
    title: req.body.title,
    paragraphs: paragraph
  }
  console.log(editPost)
  db.updatePost(req.params.id, editPost)
    .then(id => {     
      db.getPost(id)
        .then(post => {
          post.paragraphs = JSON.parse(post.paragraphs)
          res.json(camelcaseKeys(post))
        })
    })
})


module.exports = router
