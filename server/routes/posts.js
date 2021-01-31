const express = require('express')
const camelCase = require('camelcase-keys')

const db = require('../db/db')

const router = express.Router()

// put routes here

router.get('/', (req, res) => {
  db.getPosts()
    .then(posts => {
      
      posts = posts.map(post => {
        post = camelCase(post)
        post.paragraphs = JSON.parse(post.paragraphs)
        return post
      })
      
      res.json(posts)

      //  posts.map(p => {return (p.paragraphs)} )
      // console.log(paragraphsCollection)
      // res.json(camelCase(JSON.parse(paragraphsCollection)));
    });
});

// router.post('/', (req, res) => {
//   const post = req.body;
//   db.addPost(post)
//     .then(id => {
//       res.json({ id: id });
//     });
// });

module.exports = router
