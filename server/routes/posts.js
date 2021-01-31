const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/v1/posts', (req, res)=> {
  res.json()
})

router.post('/v1/posts', (req, res)=> {
  res.json()
})

router.patch('/v1/posts/:id', (req, res)=> {
  res.json()
})

router.delete('/v1/posts/:id', (req, res)=> {
  res.json()
})

router.get('/v1/posts/:postId/comments', (req, res)=> {
  res.json()
})

router.post('/v1/posts/:postId/comments', (req, res)=> {
  res.json()
})

router.patch('/v1/comments/:commentId', (req, res)=> {
  res.json()
})

router.delete('/v1/comments/:commentId', (req, res)=> {
  res.json()
})

module.exports = router
