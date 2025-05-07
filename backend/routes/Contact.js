const express = require("express");
const {
  addQuery,
  fetchQuries,
  markAsRead,
  deleteQuery,
  reply,
} = require("../controllers/Contact");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(isAuthenticated, fetchQuries).post(addQuery);
router
  .route("/:id")
  .patch(isAuthenticated, markAsRead)
  .delete(isAuthenticated, deleteQuery)
  .post(isAuthenticated, reply);

module.exports = router;
