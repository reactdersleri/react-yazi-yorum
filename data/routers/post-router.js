const express = require("express");
const router = express.Router();

const DB = require("../data-model");

router.get("/", (req, res) => {
  DB.findPosts()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ errorMessage: "Yazilar yuklenirken hata olustu", error: e });
    });
});

router.get("/latest-comments", (req, res) => {
  DB.findComments()
    .then((comments) => {
      res.status(200).json(comments);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ errorMessage: "Yorumlar yuklenirken hata olustu" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  DB.findPostById(id)
    .then((post) => {
      post !== undefined
        ? res.status(200).json(post)
        : res
            .status(500)
            .json({ errorMessage: "Belirtilen ID ile bir yazi bulunamadi." });
    })
    .catch((e) => {
      res
        .status(404)
        .json({ errorMessage: "Yazi yuklenirken hata olustu", error: e });
    });
});

router.get("/:post_id/comments", (req, res) => {
  const { post_id } = req.params;
  DB.findCommentsByPost(post_id)
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((e) => {
      res
        .status(500)
        .json({ errorMessage: "Yorum yuklenirken hata olustu", error: e });
    });
});

router.post("/", (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    res
      .status(401)
      .json({ errorMessage: "Zorunlu alanlar: 'title' ve 'content'" });
  } else {
    DB.addPost({ title, content })
      .then((post) => {
        res.status(201).json(post);
      })
      .catch((e) => {
        res
          .status(500)
          .json({ errorMessage: "Yazi eklerken hata olustu", error: e });
      });
  }
});

router.post("/:post_id/comments", (req, res) => {
  const { post_id } = req.params;
  const { display_name, body } = req.body;
  if (!display_name || !body) {
    res
      .status(401)
      .json({ errorMessage: "Zorunlu alanlar: 'display_name' ve 'body'" });
  } else {
    DB.addComment({ display_name, body, post_id })
      .then((comment) => {
        res.status(201).json(comment);
      })
      .catch((e) => {
        res
          .status(500)
          .json({ errorMessage: "Yorum eklerken hata olustu", error: e });
      });
  }
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updatedPost = req.body;
  const { title, content } = updatedPost;

  if (!title || !content) {
    res
      .status(401)
      .json({ errorMessage: "Zorunlu alanlar: 'title' ve 'content'" });
  } else {
    DB.updatePost(updatedPost, id)
      .then((updatedPost) => {
        res.status(200).json(updatedPost);
      })
      .catch((e) => {
        res
          .status(500)
          .json({ errorMessage: "Yazi guncellenirken hata olustu", error: e });
      });
  }
});

router.put("/:post_id/comments/:id", (req, res) => {
  const { post_id, id } = req.params;
  const { body } = req.body;
  const updatedComment = { body, post_id };

  if (!body) {
    res.status(401).json({ errorMessage: "Zorunlu alan: 'body'" });
  } else {
    DB.updateComment(updatedComment, id)
      .then((updatedComment) => {
        res.status(200).json(updatedComment);
      })
      .catch((e) => {
        res
          .status(500)
          .json({ errorMessage: "Yorum guncellenirken hata olustu", error: e });
      });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  DB.deletePost(id)
    .then((deleted) => {
      deleted
        ? res.status(204).end()
        : res.status(404).json({ errorMessage: "Silinecek yazi bulunamadi" });
    })
    .catch((e) => {
      res.status(500).json({ errorMessage: "Yazi silerken hata olustu" });
    });
});

router.delete("/:post_id/comments/:id", (req, res) => {
  const { id } = req.params;
  DB.deleteComment(id)
    .then((deleted) => {
      deleted
        ? res.status(204).end()
        : res.status(404).json({ errorMessage: "Silinecek yorum bulunamadi" });
    })
    .catch((e) => {
      res.status(500).json({ errorMessage: "Yorum silerken hata olustu" });
    });
});

module.exports = router;
