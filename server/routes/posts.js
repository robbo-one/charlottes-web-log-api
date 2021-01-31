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
  console.log(post)
  db.addPost({title: post.title, paragraphs: JSON.stringify(post.paragraphs), date_created: new Date()})
    .then(id => {
      res.json({ id: id})
    })
})

module.exports = router
