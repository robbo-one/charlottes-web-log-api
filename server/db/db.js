const config = require('./knexfile').development
const connection = require('knex')(config)


 function getBlog (db = connection) {
    return db('Posts').select()
    .then(posts => {
      return posts.map(post => {
        post.dateCreated = post.date_created
        delete post.date_created

        post.commentCount = post.comment_count
        delete post.comment_count

        post.paragraphs = JSON.parse(post.paragraphs)

        return post
      })
    })
}

function addBlog (post, db = connection){
    post.paragraphs = JSON.stringify(post.paragraphs)
    post.date_created = (new Date()).getTime()
    return db('Posts').insert(post)
      .then(ids => ids[0])
}

function getPost (id, db= connection){
    return db('Posts').select().where('id', id).first()
    .then(post => {
      post.dateCreated = post.date_created
      delete post.date_created

      post.commentCount = post.comment_count
      delete post.comment_count

      post.paragraphs = JSON.parse(post.paragraphs)

      return post
    })
    
}

function updateBlog (id, title, paragraphs, db = connection){
    paragraphs = JSON.stringify(paragraphs)
    return db('posts')
    .where ('id',id)
    .update ({title: title, paragraphs: paragraphs})
    // .update (post)
}

function deletePosts (id, db=connection){
    return db('posts')
    .where ('id', id) 
    .del()

}


module.exports = {
    getBlog: getBlog,
    addBlog: addBlog,
    updateBlog: updateBlog,
    getPost: getPost,
    deletePosts: deletePosts
}
