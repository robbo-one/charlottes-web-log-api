const config = require('./knexfile').development
const db = require('knex')(config)

module.exports = {
  getPosts: getPosts,
  getPost: getPost,
  addPost: addPost,
  updatePost: updatePost,
  deletePost: deletePost
}

function getPosts () {
  return db('posts')
    .select()
}

function getPost (id) {
  return db('posts')
    .where('id', id)
    .select()
    .first()
}

function addPost (post) {


  return db('posts')
     .insert(post)
     .then(ids => ids[0])
}

function updatePost (id, newPost) {
  // console.log('hello')
   return db('posts')
   .where('id', id)
   .update(newPost)
}

function deletePost (id) {
  return db('posts')
    .where('id', id)
    .delete()
}