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

// router.get('/',(req,res) => { 
//   db.getPosts ()
//     .then (posts => {
//       console.log(posts)
//       res.json(toCamelCase(posts))
//     })
//   })

module.exports = router
