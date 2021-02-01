//This is where the database functions are written

const config = require('./knexfile').development
const connection = require('knex')(config)

module.exports = { 
  getPosts,
  addPost,
  getPostById,
  changePostForApi,
  changePostForDatabase,
  updatePost,
  deletePost
}

//A function to get a list of blog posts.  Will return an array of objects.
function getPosts (db = connection) {
  return db('posts').select()
    .then(posts => {
      return posts.map(post => {
        return changePostForApi(post)
      })
    })
  }//jumps to .then in routes

  //Add a new blog post and return newly created post. Title and para given, id, date and comment count automatically added. Inbound to database so use stringify.
    function addPost(post, db = connection) {
      console.log(post)
      post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts').insert(post).debug()
      .then(ids => ids[0])//returns id - jumps to back to routes.
  }

  function getPostById(id, db = connection) {
    return db('posts').select().where ('posts.id', id).first()
    .then(post => {
      return changePostForApi(post)
    })
  }
  
  //Update posts
    //.select().where ('posts.id', id).first()
    //want to a function similar to modifyPost that changes title and paras and then returns id so this can be retrieved
  function updatePost(id, post, db = connection) {
    post = changePostForDatabase(post)
    return db('posts').update(post).where('posts.id', id)//jumps back to api
      }
  
    function changePostForDatabase (post) {
      post.date_created = post.dateCreated
      delete post.dateCreated
      post.paragraphs = JSON.stringify(post.paragraphs)
      post.comment_count = post.commentCount 
      delete post.commentCount
      return post //jumps to line 48
    }


    function deletePost(id, db = connection) {
      return db('posts').delete().where('posts.id', id)
      //jumps back to routes line 46
    }
    

//Retrieve comments for a particular blog post
function getComments(id, db = connection) {
    return db('posts').select().where('posts.id', id)
    //jumps to routes
}











//This function modifies all posts
  function changePostForApi (post) {
    post.dateCreated = post.date_created
    delete post.date_created
    post.paragraphs = JSON.parse(post.paragraphs)
    post.commentCount = post.comment_count
    delete post.comment_count
    return post 
  }
    

  