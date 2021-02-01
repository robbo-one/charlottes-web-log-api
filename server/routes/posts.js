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
  const newPost = req.body
  // console.log(newPost)
  newPost.paragraphs = JSON.stringify(newPost.paragraphs)
  newPost.date_created = newPost.dateCreated
  delete newPost.dateCreated
  newPost.comment_count = newPost.commentCount 
  delete newPost.commentCount

  db.updatePost(req.params.id, newPost)
  .then(result => {
    db.getPost(req.params.id)
    .then(post => {
      post.paragraphs = JSON.parse(post.paragraphs)
      console.log(post)
      res.json(camelcaseKeys(post))
    })     
  })
})

router.delete('/:id', (req,res) => {
  db.deletePost(req.params.id)
    .then(result => {
      console.log(result)
      db.getPosts()
      .then(posts => { 
        const postData = posts.map(post => {
          post.paragraphs = JSON.parse(post.paragraphs)
          return post
        })    
        res.json(camelcaseKeys(postData))
      })
    })
})



module.exports = router
