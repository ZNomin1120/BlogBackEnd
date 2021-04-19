const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controller/user");

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
