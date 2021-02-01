const connection = require('./connection')

function getPosts(db = connection) {
  return db('posts').select()
}

function addPost(post, db = connection) {
  return db('posts')
  .insert(post)
   
}

function getPost(id, db = connection) {
  return db('posts')
    .where('Posts.id', id)
    .first()
}

function updatePost(id,title,paragraphs, db = connection) {
  return db('posts')
  .where('Posts.id', id)
  .update({
    title: title,
    paragraphs: paragraphs
  })
}

function deletePost(id, db = connection){
  return db('posts')
  .where('Posts.id', id)
  .delete()
}

function getComments(id, db = connection){
  return db('comments')
  .where('post_id', id)
}

function postComment(id, comment, db = connection){
    return db('comments')
    .insert({post_id: id, comment: comment, date_posted: new Date()})
}

function getComment(id, db = connection) {
    return db('comments')
    .where('id', id)
    .first()
}


module.exports = {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  getComments,
  postComment,
  getComment

}