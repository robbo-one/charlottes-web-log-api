const { json } = require('express')
const express = require('express')
const { get } = require('lodash')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
    db.getPosts()
        .then(posts => {
            res.json(posts)
        })
})

router.post('/', (req,res) => {
    const post = req.body
    db.addPost(post)
        .then(id => {
            db.getPostById(id)
            .then(post => {
                res.json(post)
            })
        })
})

module.exports = router
