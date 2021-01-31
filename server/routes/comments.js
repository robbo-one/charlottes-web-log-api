const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.patch('/:commentId', (req, res)=> {
  res.json()
})

router.delete('/:commentId', (req, res)=> {
  res.json()
})

module.exports = router
