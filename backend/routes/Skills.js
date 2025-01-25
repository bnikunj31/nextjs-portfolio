const express = require("express");
const {
  addSkill,
  fetchSkills,
  fetchSkillsById,
  updateSkill,
  deleteSkill,
} = require("../controllers/Skills");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/").get(fetchSkills).post(isAuthenticated, addSkill);

// Admin API's
router
  .route("/:id")
  .all(isAuthenticated)
  .get(fetchSkillsById)
  .patch(updateSkill)
  .delete(deleteSkill);

module.exports = router;
