const { post } = require('../routes/posts')
const connection = require('./connection')

function getPosts(db = connection) {
  return db('posts')
}

function addPosts(post, db = connection) {
  return db('posts')
    .insert(post)
}

function getPostId(id, db = connection) {
  return db('posts')
    .where('posts.id', id)
    .first()
}

module.exports = {
  getPosts,
  addPosts,
  getPostId
}
