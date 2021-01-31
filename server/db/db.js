//This is where the database functions are written

const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = { getPosts
}

//A function to get a list of blog posts.  Will return an array of objects.

function getPosts (db = connection) {
  return db('posts').select()
    .then(posts => {
      return posts.map(post => {
        post.dateCreated = post.date_created
        delete post.date_created
        return post
      })
    })
}



