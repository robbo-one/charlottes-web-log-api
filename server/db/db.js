//This is where the database functions are written

const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = { 
  getPosts,
  addPost,
  getPostById
}

//A function to get a list of blog posts.  Will return an array of objects.

function getPosts (db = connection) {
  return db('posts').select()
    .then(posts => {
      return posts.map(post => {
        return modifyPost(post)
      })
    })
  }

  //A function to add a new blog post
  //create migration for this?
  //return newly created blog post
    function addPost(post, db = connection) {
      console.log(post)
      post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts').insert(post).debug()
      .then(ids => ids[0])
  }

  function getPostById(id, db = connection) {
    return db('posts').select().where ('posts.id', id).first()
    .then(post => {
      return modifyPost(post)
    })
  }
  

  function modifyPost (post) {
    post.dateCreated = post.date_created
    delete post.date_created
    post.paragraphs = JSON.parse(post.paragraphs)
    post.commentCount = post.comment_count
    delete post.comment_count
    return post 
  }
    

  