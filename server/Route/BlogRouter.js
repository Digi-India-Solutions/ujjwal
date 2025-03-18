const express = require("express");
const uploader = require("../Multer/Multer");

const BlogRouter = express.Router();

const {
  addBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  singleBlog,
} = require("../Controllar/blogController.js");

BlogRouter.route("/blog/add").post(uploader.single("image"), addBlog)
BlogRouter.route("/blog/get").get(getBlog)
BlogRouter.route("/blog/change/:id")
  .patch(uploader.single("image"), updateBlog)
  .delete(deleteBlog)
  .get(singleBlog);

module.exports = BlogRouter;
