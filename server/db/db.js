const config = require('./knexfile').development
const db = require('knex')(config)

function getPosts () {
  return db('posts').select()
}

function addPost(post) {
  post.paragraphs = JSON.stringify(post.paragraphs)
  //new Date().getTime()
  return db('posts')
  .insert({title: post.title, date_created: new Date(Date.now()), paragraphs:post.paragraphs})
   .then(ids => ids[0]) //{
    // console.log(title, paragraphs, date)
  // })
}

function getPost(id) {
  return db('posts')
  .where("id", id)
  .select('*')
  // .first()
  // .then(post => {
  //   console.log(post)
  // })
}

function editPost(post) {
  post.paragraphs = JSON.stringify(post.paragraphs)
  return db('posts')
  .where("id", post.id)
  .update({title: post.title, paragraphs: post.paragraphs})
  // .then(output => {
  //   console.log(output)
  // })
}

function getCommentsForPost(postId) {
  return db('comments')
  // .join('posts', 'posts.id', 'comments.post_id')
  .where('post_id', postId)
  .select('*')
  // .then(output => {
  //   console.log(output)
  // })
  // .select("*", 'posts.id AS posts_id', 'comments.id as id')
  // .then(comments=>{
  //   console.log(comments)
  // })
}

function addCommentForPost(addComment) {
  return db('comments')
  .insert({post_id: addComment.postId, comment: addComment.comment, date_posted: new Date(Date.now())})
  .then(ids => ids[0])
}

function getSpecificComment(commentID){
  return db('comments')
  .where("id", commentID)
  .select('*')
}

function editComment(editComment){
  return db('comments')
  .update({post_id: editComment.postId, comment: editComment.comment, date_posted: new Date(Date.now())})
  .where('id', editComment.id)
  // .then(output => {
  //   console.log(editComment.id)
  // })
  
}

function deleteComment(commentID){
  return db('comments')
  .delete()
  .where('id', commentID)
}

function deletePost(postID) {
  return db('posts')
  .delete()
  .where('id', postID)
}

module.exports = {
  getPosts,
  addPost,
  getPost,
  editPost,
  getCommentsForPost,
  addCommentForPost,
  getSpecificComment,
  editComment,
  deleteComment,
  deletePost
}
