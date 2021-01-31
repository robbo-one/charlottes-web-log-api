const connection = require('./connection')

function getPosts(db = connection) {
  return db('posts')
}

// function addPost(post, db = connection) {
//   return db('posts').insert(post)
//     .then('posts')
// }


module.exports = {
  getPosts,
  // addPost
}
