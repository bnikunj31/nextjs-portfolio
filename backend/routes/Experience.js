const express = require("express");
const {
  fetchExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  fetchExperienceById,
} = require("../controllers/Experience");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(fetchExperience).post(isAuthenticated, addExperience);
router
  .route("/:id")
  .get(isAuthenticated, fetchExperienceById)
  .patch(isAuthenticated, updateExperience)
  .delete(isAuthenticated, deleteExperience);

module.exports = router;
