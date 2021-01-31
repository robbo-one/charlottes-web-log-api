const express = require('express')
const camelCase = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
  db.getPosts()
    .then(posts => {
      
      res.json(camelCase(posts))
    })
})

module.exports = router
