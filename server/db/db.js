const config = require('./knexfile').development
const db = require('knex')(config)

function getPosts () {
  return db('posts')
}

function addPost (post) {
  return db('posts')
  .insert(post)
}

function getPost (id) {
  return db('posts')
  .where('id', id)
  .first()
}

module.exports = {
  getPosts,
  addPost,
  getPost
}

