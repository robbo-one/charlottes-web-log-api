// const config = require('./knexfile').development
// const db = require('knex')(config)
const connection = require('./connection')

function getPosts(db = connection) {
    return db('posts').select()
    .then(posts => {
        return posts.map(post => {
            post.paragraphs = JSON.parse(post.paragraphs)
            return post
        })

    })
}
    

function addPost(post, db = connection) {
    post.paragraphs = JSON.stringify(post.paragraphs)
    return db('posts').insert(post)
    .then(ids => ids[0])
}


module.exports = {
    getPosts,
    addPost
}
