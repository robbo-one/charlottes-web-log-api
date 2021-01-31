const express = require('express')
const camelcaseKeys = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
  db.getPosts()
    .then(posts => {     
      res.json(camelcaseKeys(posts))
    })
})

router.post('/', (req, res) => {
  const paragraph = JSON.stringify(req.body.paragraphs)
 
  const post = {
    title: req.body.title,
    paragraphs: paragraph
  }
  console.log(post)
  db.addPost(post)
    .then(id => {     
      res.json({ id: id })
    })
})


module.exports = router
