const express = require("express");

const db = require("../db/db");

// const camelcaseKeys = require("camelcase-keys");
const lodash = require("lodash");

const router = express.Router();

function doStuffWithPosts(posts) {
  let newArr = [];
  for (let i = 0; i < posts.length; i++) {
    let obj = lodash.mapKeys(posts[i], function (value, key) {
      return lodash.camelCase(key);
    });
    obj.paragraphs = JSON.parse(posts[i].paragraphs);
    // console.log(obj)
    newArr.push(obj);
  }
  return newArr;
}

router.get("/", (req, res) => {
  db.getPosts().then((posts) => {
    let newArr = doStuffWithPosts(posts);
    res.json(newArr);
  });
});

router.post("/", (req, res) => {
  db.addPost(req.body).then((id) => {
    console.log("id= " + id);
    db.getPost(id).then((post) => {
      // console.log(post)
      let newPost = doStuffWithPosts(post);
      // console.log(newPost)
      res.json(newPost[0]);
    });
  });
});

router.patch("/:id", (req, res) => {
  db.editPost(req.body)
  // console.log(req.body, req.params.id)
  .then((howManyThingsUpdated) => {
    console.log(howManyThingsUpdated)
    db.getPost(req.params.id)
    .then((post) => {
      console.log(post)
      let newPost = doStuffWithPosts(post);
      res.json(newPost[0]);
    });
  });
});

router.delete("/:id", (req, res) => {
  db.deletePost(req.params.id).then(() => {
    res.json("Status OK");
  });
});

router.get("/:postId/comments", (req, res) => {
  console.log(req.params.postId)
  db.getCommentsForPost(req.params.postId)
  .then((output) => {
    console.log(output)
    res.json(output);
  });
});

router.post("/:postId/comments", (req, res) => {
  // console.log(req.body)
  db.addCommentForPost(req.body)
  .then((commentID) => {
    db.getSpecificComment(commentID)
    .then((comment) => {
      res.json(comment);
    });
  });
});

module.exports = router;

// put routes here

// Object.prototype.renameProperty = function (key, newKey) {
//   if (key === newKey) {
//     return this;
//   }
//   if (this.hasOwnProperty(key)) {
//     this[newKey] = this[key];
//     delete this[key];
//   }
//   return this;
// };

// let newPosts = posts.map(post => {
//   for(const key in post) {
//     if(key.includes('_')){
//       let newKey = lodash.camelCase(key)
//       renameProperty(key, newKey)
//       // Object.defineProperties(post, newKey,
//       //   Object.getOwnPropertyDescriptor(post, key))
//       // delete post[key]
//       // console.log(post)
//       // Object.prototype.renameProperty = function(key, newKey) {
//       //   if(key === newKey) {
//       //     return this
//       //   }
//       //   if(this.hasOwnProperty(key)){
//       //     this[newKey] = this[key]
//       //     delete this[key]
//       //   }
//       //   return this
//       // }
//       // renameProperty(key, newKey)
//       // console.log(post)
//       // return
//       console.log(newKey)
//       console.log(post)
//     }
//   }
//   // console.log(post)
//   return post
// })
// console.log(obj)
// console.log(newArr)
// lodash.mapKeys(posts)
// console.log(newPosts)
// function doStuffWithPost(post) {
//   let obj = lodash.mapKeys(post, function (value, key) {

//     return lodash.camelCase(key);
//   });
//   console.log(obj)
//   obj.paragraphs = JSON.parse(post.paragraphs)
//   return obj
// }
// let newArr = [];
// for (let i = 0; i < posts.length; i++) {
//   let obj = lodash.mapKeys(posts[i], function (value, key) {

//     return lodash.camelCase(key);
//   });
//   obj.paragraphs = JSON.parse(posts[i].paragraphs)
//   // console.log(obj)
//   newArr.push(obj);
//   // console.log(JSON.parse(posts[i].paragraphs))
// }
// console.log(newArr);

// let obj = {
//   title: req.body.title,
//   paragraphs: req.body.paragraphs,
// };
// console.log(obj.title)
// console.log(req.body)
// console.log(req.body.paragraphs)

// for (let i = 0; i < obj.paragraphs.length; i++) {
//   console.log("there is this many arrays", i)
// }
