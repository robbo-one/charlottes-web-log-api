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

module.exports = router
