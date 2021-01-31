const config = require('./knexfile').development
const db = require('knex')(config)

module.exports = {
  getPosts: getPosts,
  addPost: addPost
}

function getPosts () {
  return db('posts')
    .select()
}

function addPost (post) {
  return db('posts')
     .insert(post)
    //  .then(ids => ids)

}