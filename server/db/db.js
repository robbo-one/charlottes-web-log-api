const config = require('./knexfile').development
const connection = require('knex')(config)

function getPosts (db = connection) {
  return db('posts')
}

function addPost (post, db = connection) {
  return db('posts')
  .insert(post)
}

function getPost (id, db = connection) {
  return db('posts')
  .where('id', id)
  .first()
}

function updateBlogPost (id, title, paragraphs, db = connection) {
  return db('posts')
  .where('id', id)
  .update({title : title, paragraphs : paragraphs})
}

function deletePost (id, db = connection) {
  return db('posts')
  .where('id', id)
  .del()
}

function getComments (id, db = connection) {
  return db('comments')
  .where('post_id', id)
}

function addComment (id, comment, db = connection) {
  return db('comments')
  .insert({post_id : id, comment : comment, date_posted : new Date()})
}

function getComment (id, db = connection) {
  return db('comments')
  .where('id', id)
  .first()
}

function updateComment(id, comment, db = connection) {
  return db('comments')
  .where('id', id)
  .update({comment : comment})
}

function deleteComment(id, db = connection) {
  return db('comments')
  .where('id', id)
  .del()
}

module.exports = {
  getPosts,
  addPost,
  getPost,
  updateBlogPost,
  deletePost,
  getComments,
  addComment,
  getComment,
  updateComment,
  deleteComment
}

