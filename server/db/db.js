const config = require('./knexfile').development
const db = require('knex')(config)

function getBlogPosts () {
    return db('posts').select()
}

module.exports = {
    getBlogPosts
}
