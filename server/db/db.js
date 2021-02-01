const config = require('./knexfile').development
const db = require('knex')(config)

module.exports = {
  getPosts: getPosts,
  getPost: getPost,
  addPost: addPost,
  updatePost: updatePost,
  deletePost: deletePost,
  getComments: getComments,
  addComment: addComment,
  editComment: editComment
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

function getComments(id) {
  return db('comments')
  .where('post_id', id)
  .select()
}

function addComment(postId, newComment) {
  return db('comments')
    .insert({
      "post_id": postId,
      "date_posted": new Date(),
      "comment": newComment.comment 
    })
}

function editComment(commentId, newComment) {
  return db('comments')
    .where('id', commentId)
    .update(newComment)
}