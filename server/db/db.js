const config = require('./knexfile').development
const db = require('knex')(config)

module.exports = {
  getPosts: getPosts,
  getPost: getPost,
  addPost: addPost,
  updatePost: updatePost
}

function getPosts () {
  return db('posts')
    .select()
}

function getPost (id) {
  return db('posts')
    .where('id', id)
    .select()
    .first()
}

function addPost (post) {

  
  return db('posts')
     .insert(post)
     .then(ids => ids[0])
}

function updatePost (id, post) {
  console.log ({title: post.title,paragraphs: post.paragraphs})
  return db('posts')
    .where('id', id)
    .update({
      title: post.title,
      paragraphs: post.paragraphs
    })
}