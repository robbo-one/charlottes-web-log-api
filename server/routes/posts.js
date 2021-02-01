const express = require("express");

const db = require("../db/db");

// const camelcaseKeys = require("camelcase-keys");
const lodash = require("lodash");

const router = express.Router();

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
router.get("/", (req, res) => {
  db.getPosts()
  .then((posts) => {
    let newArr = [];
    for (let i = 0; i < posts.length; i++) {
      let obj = lodash.mapKeys(posts[i], function (value, key) {
        
        return lodash.camelCase(key);
      });
      obj.paragraphs = JSON.parse(posts[i].paragraphs)
      // console.log(obj)
      newArr.push(obj);
      // console.log(JSON.parse(posts[i].paragraphs))
    }
    // console.log(newArr);
    res.json(newArr);
  });
});

router.post("/", (req, res) => {
  // let obj = {
  //   title: req.body.title,
  //   paragraphs: req.body.paragraphs,
  // };
  

  db.addPost(req.body)
    .then(id=> {
      console.log("id= "+id)
      db.getPost(id)
      .then(post => {
        // console.log("post= "+{post})
        res.json(post)
      })
    })

});
  
  // console.log(obj.title)
  // console.log(req.body)
  // console.log(req.body.paragraphs)

  // for (let i = 0; i < obj.paragraphs.length; i++) {
  //   console.log("there is this many arrays", i)
  // }


router.patch("/:id", (req, res) => {
  db.editPost(req.params.id, req.body)
    .then(howManyThingsUpdated=>{
      db.getPost(req.params.id)
        .then(post=> {
          res.json(post);

        })
    })
});

router.delete("/:id", (req, res) => {
  res.json();
});

router.get("/:postId/comments", (req, res) => {
  db.getCommentsForPost(req.params.id)
    .then(()=> {
      
    })
  res.json();
});

router.post("/:postId/comments", (req, res) => {
  res.json();
});

module.exports = router;
