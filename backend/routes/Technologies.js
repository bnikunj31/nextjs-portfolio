const express = require("express");
const {
  fetchTechonologies,
  addTechonology,
  updateTechonologies,
  deleteTechonology,
  fetchTechonologiesById,
} = require("../controllers/Technologies");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/").get(fetchTechonologies).post(isAuthenticated, addTechonology);
router
  .route("/:id")
  .get(isAuthenticated, fetchTechonologiesById)
  .patch(isAuthenticated, updateTechonologies)
  .delete(isAuthenticated, deleteTechonology);

module.exports = router;
