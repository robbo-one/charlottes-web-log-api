const config = require('./knexfile').development
const connection = require('knex')(config)


 function getBlog (db = connection) {
    return db('posts').select()
}

function addBlog (post, db = connection){
  return db('posts').insert(post)
    .then(id => ids[0])
}

module.exports = {
    getBlog: getBlog,
    addBlog: addBlog
}
