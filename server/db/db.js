const connection = require('./connection')

function getPosts(db = connection) {
  return db('Posts')
}



function addPost(post, db = connection) {
  return db('Posts').insert(post)
}

function getPostById(id, db = connection) {
  return db('Posts')
    .where('Posts.id', id)
    .first()
}


module.exports = {
  getPosts,
  addPost,
  getPostById
}
