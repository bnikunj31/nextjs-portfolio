const { isAuthenticated } = require("../middleware/auth");
const {
  getClient,
  addClient,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/Client");
const express = require("express");
const router = express.Router();

router
  .route("/")
  .get(isAuthenticated, getClient)
  .post(isAuthenticated, addClient);
router
  .route("/:id")
  .get(isAuthenticated, getClientById)
  .patch(isAuthenticated, updateClient)
  .delete(isAuthenticated, deleteClient);

module.exports = router;
