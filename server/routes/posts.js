const express = require('express')

const db = require('../db/db')

const router = express.Router()

// put routes here
router.get('/', (req, res) => {
    db.getBlogPosts()
    .then(posts => {
        console.log(posts)
        res.json(posts)
    })
})

module.exports = router
