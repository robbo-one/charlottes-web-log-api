const config = require('./knexfile').development
const db = require('knex')(config)

function getPosts () {
  return db('posts').select()
}

function addPost(title,paragraphs) {
  return db('posts')
  .insert({title: title,paragraphs: paragraphs})
  // .then(() => {
  //   console.log(title, paragraphs)
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

module.exports = {
  getPosts,
  addPost,
  getPost
}
