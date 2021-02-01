const camelcaseKeys = require('camelcase-keys')
const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.patch('/:commentId', (req, res) => {
  const newComment = req.body
  newComment.post_id = newComment.postId
  delete newComment.postId
  newComment.date_posted = newComment.datePosted
  delete newComment.datePosted
  db.editComment(req.params.commentID, newComment)
    .then(result => {
      console.log(result)
    })
})

module.exports = router
