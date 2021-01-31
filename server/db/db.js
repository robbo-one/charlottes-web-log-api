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
    .where('posts.id', id)
    .first()
}


module.exports = {
  getPosts,
  addPost,
  getPost
}
