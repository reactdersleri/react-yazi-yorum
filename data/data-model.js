const db = require("./db-config");

module.exports = {
  findByUsername,
  addUser,
  findPosts,
  findPostById,
  findComments,
  findCommentsByPost,
  addPost,
  addComment,
  updatePost,
  updateComment,
  deletePost,
  deleteComment,
};

function findByUsername(username) {
  return db("user").where({ username }).first();
}

function addUser(user) {
  return db("user")
    .insert(user, "id")
    .then(([id]) => {
      // return user by the id
      return db("user").where({ id }).first();
    });
}

function findPosts() {
  return db("post");
}

function findPostById(id) {
  return db("post").where({ id }).first();
}

function findComments() {
  return db("comment").orderBy("id", "desc").limit(10);
}

function findCommentsByPost(post_id) {
  return db("comment").where({ post_id });
}

function addPost(newPost) {
  return db("post")
    .insert(newPost, "id")
    .then(([id]) => {
      return db("post").where({ id }).first();
    });
}

function addComment(newComment) {
  return db("comment")
    .insert(newComment, "id")
    .then(([id]) => {
      return db("comment").where({ id }).first();
    });
}

function updatePost(updatedPost, id) {
  return db("post")
    .update(updatedPost)
    .where({ id })
    .then((updated) => {
      return updated && db("post").where({ id }).first();
    });
}

function updateComment(updatedComment, id) {
  return db("comment")
    .update(updatedComment)
    .where({ id })
    .then((updated) => {
      return updated && db("comment").where({ id }).first();
    });
}

function deletePost(id) {
  return db("post").del().where({ id });
}

function deleteComment(id) {
  return db("comment").del().where({ id });
}
