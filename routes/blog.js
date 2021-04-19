const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/protect");

const {
  getAllBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  sendImage,
  uploadPhoto,
} = require("../controller/blog");

router.route("/").get(getAllBlogs).post(createBlog);
router.route("/:id").get(getBlog).put(updateBlog).delete(deleteBlog);
router.route("/:id/photo").post(uploadPhoto);
router.route("/photo/:name").get(sendImage);

module.exports = router;
