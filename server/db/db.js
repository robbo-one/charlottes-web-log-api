const config = require('./knexfile').development
const connection = require('knex')(config)
const camelcaseKeys = require('camelcase-keys');

module.exports = {
  getBlogs: getBlogs,
  postNewBlog: postNewBlog,
  updateExisitingBlog: updateExisitingBlog

}



function getBlogs (db = connection) {
  return db('Posts').select()
}

function postNewBlog (post, db = connection) {
  return db('Posts').insert(post)
  .then(ids => ids[0])
}

function updateExisitingBlog (post, db = connection){
  return db('Posts').patch(post)
  .then(ids => ids[0])
}


