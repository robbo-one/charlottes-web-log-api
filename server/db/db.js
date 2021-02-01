const config = require('./knexfile').development
const db = require('knex')(config)

function getBlogPosts () {
    return db('posts').select()
}

function getPost (id) {

  return db('posts').select().where("id", id).first()

}

function addPost(post) {
    post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts').insert(post)
      .then(posts => posts[0])
  }

  function updatePost(id, post) {
    post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts')
    .where("id", id)
    .update(post)
  }

  function deletePost(id) {
    return db('posts')
    .delete().where("id", id)
  }


module.exports = {
    getBlogPosts,
    addPost,
    updatePost,
    getPost,
    deletePost
}
