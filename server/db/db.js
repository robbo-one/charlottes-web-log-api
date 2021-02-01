const { post } = require('../routes/posts')
const connection = require('./connection')

function getPosts(db = connection) {
  return db('Posts')
}

function addPosts(post, db = connection) {
  return db('Posts')
    .insert(post)
}

function getPostId(id, db = connection) {
  console.log(id)
  return db('Posts')
    .where('Posts.id', id)
    .first()
}

function updatePost(id, title, paragraphs, db = connection) {
  return db('Posts')
    .where('Posts.id', id)
    .update({
      title: title,
      paragraphs: paragraphs
    })
}

function deletePost(id, db = connection) {
  return db('Posts')
    .where('Posts.id', id)
    .del()
}

module.exports = {
  getPosts,
  addPosts,
  getPostId,
  updatePost,
  deletePost
}
