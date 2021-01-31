const connection = require('./connection')

function getPosts(db = connection) {
  return db('posts')
}


module.exports = {
  getPosts
}
