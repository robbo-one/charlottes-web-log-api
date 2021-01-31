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
  console.log(post)
  db.postNewBlog(post)
  .then(id => {
    res.json({ id: id })
  })
})

// router.get('/:id', (req, res) => {

// })

router.post('/:id', (req, res) => {
  const post = req.body
  console.log(post)
  db.updateExisitingBlog(post)
  .then(Posts => {
    const updateData = Posts.find((post) => {
    post.id = JSON.parse(post.paragraphs)
    return post
  })
    res.json(camelcaseKeys(updateData))
})
})




module.exports = router
