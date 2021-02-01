const express = require('express')
const { post } = require('superagent')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req,res) => {
    db.getBlog()
    .then(posts =>
        res.json(posts))
})

router.post('/', (req,res) => {
    const post = req.body
    db.addBllog(post)
      .then(id => {
        db.getPost(id)
          .then(post => {
            res.json(post)
          })
      })
})

router.patch('/:id', (req,res) => {
    const post = req.body
    const id = req.params.id
    console.log(req.params.id)
    console.log(post)
    delete post.id

    
    db.updateBlog (id, post.title, post.paragraphs)
    // db.updateBlog (id, post)
    .then(id => {
        res.json({ })
    })
})


router.delete('/:id', (req, res) =>{
    const id = req.params.id
    db.deletePosts (id)
    .then(() => {
    res.json({ })
})
})



module.exports = router
