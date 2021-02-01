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

function getComments(id, db = connection) {
  return db('Comments')
    .where('post_id', id)
}

function addComment(id, db = connection) {
  return db('Comments')
    .insert()
}

module.exports = {
  getPosts,
  addPosts,
  getPostId,
  updatePost,
  deletePost,
  getComments,
  addComment
}
