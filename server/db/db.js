const config = require('./knexfile').development
const connection = require('knex')(config)
const camelcaseKeys = require('camelcase-keys');

module.exports = {
  getBlogs: getBlogs,
  postNewBlog: postNewBlog,
  getPost: getPost,
  updateExisitingBlog: updateExisitingBlog,
  getComments, getComments,

}

function getBlogs (db = connection) {
  return db('Posts').select()
}

function postNewBlog (post, db = connection) {
  return db('Posts').insert(post)
  .then(ids => ids[0])
}

function getPost (id, db = connection) {
  return db('Posts').where('id',id ).first()
}

function updateExisitingBlog (id, post, db = connection){
  return db('Posts').update(post).where('id', id)
  .then(ids => ids[0])
}

function getComments (id, db = connection){
  return db('Comments').select().where('post_id', id)
  .then(ids => ids[0])
}


