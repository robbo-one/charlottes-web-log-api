const express = require('express')
const camelCase = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.patch('/:commentId', (req, res) => {
  const id = req.params.commentId
  const comment = req.body.comment
  db.updateComment(id, comment)
  .then(id => {
    db.getComment(id)
    .then(comment => {
      // console.log(comment)
      res.json(camelCase(comment))
    })
  })
})

router.delete('/:commentId', (req, res) => {
  const id = req.params.commentId
  db.deleteComment(id)
  .then(
    // res.json({})
    res.sendStatus(200)
  )
})

module.exports = router
