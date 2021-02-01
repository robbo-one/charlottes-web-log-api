const { json } = require('express')
const express = require('express')
const camelcaseKeys = require('camelcase-keys');

const db = require('../db/db');
// const { camelCase } = require('../db/db');

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
  db.getBlogs()
  .then(Posts => {
    const postData = Posts.map((post)=>{
      post.paragraphs = JSON.parse(post.paragraphs)
      return post
    })
    res.json(camelcaseKeys (postData)) 
  }
  )
})

router.post('/', (req, res) => {
  const post = req.body
  post.paragraphs = JSON.stringify(post.paragraphs)
  db.postNewBlog(post)
  .then(id => {
    db.getPost(id)
    .then(post => {
    post.paragraphs = JSON.parse(post.paragraphs)
    res.json(camelcaseKeys (post)) 
    })

  })
})

router.patch('/:id', (req, res) => {
  const post = req.body
  const id = req.params.id
  post.paragraphs = JSON.stringify(post.paragraphs)
  db.updateExisitingBlog(id, post)
  .then(() => {
    db.getPost(id)
    .then(post => {
    post.paragraphs = JSON.parse(post.paragraphs)
    res.json(camelcaseKeys (post))
    })
  })
})

router.get('/:postId/comments', (req, res) => {
    const id = req.params.postId
    db.getComments(id)
    .then(Comments => {
      console.log(Comments)
      res.json(Comments) 
    })
    })





module.exports = router
