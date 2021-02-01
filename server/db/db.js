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


module.exports = {
  getPosts,
  addPost,
  getPost,
  updatePost,
  deletePost,
  getComments
}
