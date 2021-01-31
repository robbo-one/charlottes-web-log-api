const express = require('express')

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
    console.log(post)
    db.addBlog(post)
    .then(id => {
        res.json({id: id})
    })

})

module.exports = router
