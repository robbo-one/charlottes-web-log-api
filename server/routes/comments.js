const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.patch('/:commentId', (req, res)=> {
  // console.log(req.body)
  // console.log(req.params.commentId)
  // console.log(req.body.id)
  db.editComment(req.body)
  .then(howManyThingsUpdated=>{
    db.getSpecificComment(req.params.commentId)
    .then(comment=>{

      res.json(comment)
    })

  })
})

router.delete('/:commentId', (req, res)=> {
  db.deleteComment(req.params.commentId)
  .then(()=> {
    res.json('Status OK')
  })
})

module.exports = router
