const config = require('./knexfile').development
const db = require('knex')(config)

function getBlogPosts () {
    return db('posts').select()
}

function getPost (id) {
  return db('posts').select().where("id", id)
}

function addPost(post) {
    post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts').insert(post)
      .then(posts => posts[0])
  }

  function updatePost(id, post) {
    return db('posts')
    .where("id", id)
    .update({post: post})
      .then(post => post[0])
  }

module.exports = {
    getBlogPosts,
    addPost,
    updatePost,
    getPost
}
