const express = require("express");
const {
  getPost,
  getPostById,
  addPost,
  updatePost,
  deletePost,
} = require("../controllers/Posts");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(getPost).post(isAuthenticated, addPost);
router
  .route("/:id")
  .get(isAuthenticated, getPostById)
  .patch(isAuthenticated, updatePost)
  .delete(isAuthenticated, deletePost);

module.exports = router;
