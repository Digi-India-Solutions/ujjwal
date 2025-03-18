const {
  createBanner,
  getBanner,
  getSingleBanner,
  deleteBanner,
  updateBanner,
} = require("../Controllar/BannerControllar");
const uploader = require("../Multer/Multer");

const bannerrouter = require("express").Router();

bannerrouter.post("/banner", uploader.single("image"), createBanner);
bannerrouter.put("/banner/:_id", uploader.single("image"), updateBanner);
bannerrouter.get("/banner", getBanner);
bannerrouter.delete("/banner/:_id", deleteBanner);
bannerrouter.get("/banner/:_id", getSingleBanner);

module.exports = bannerrouter;
