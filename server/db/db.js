const config = require('./knexfile').development
const db = require('knex')(config)

function getPosts () {
  return db('posts').select()
}

function addPost(post) {
  post.paragraphs = JSON.stringify(post.paragraphs)
  return db('posts')
  .insert(post)
   .then(ids => ids[0]) //{
    // console.log(title, paragraphs, date)
  // })
}

function getPost(id) {
  return db('posts')
  .where("id", id)
  .select('*')
  // .then(post => {
  //   console.log(post)
  // })
}

function editPost(id, post) {
  post.paragraphs = JSON.stringify(post.paragraphs)
  return db('posts')
  .where("id", id)
  .update(post)
}

module.exports = {
  getPosts,
  addPost,
  getPost,
  editPost
}
