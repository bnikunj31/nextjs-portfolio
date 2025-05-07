const {
  getWork,
  addWork,
  getWorkById,
  updateWork,
  deleteWork,
} = require("../controllers/Work");
const { isAuthenticated } = require("../middleware/auth");
const express = require("express");
const router = express();

router.route("/").get(isAuthenticated, getWork).post(isAuthenticated, addWork);
router
  .route("/:id")
  .get(isAuthenticated, getWorkById)
  .patch(isAuthenticated, updateWork)
  .delete(isAuthenticated, deleteWork);

module.exports = router;
