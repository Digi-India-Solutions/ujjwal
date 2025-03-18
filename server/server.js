const express = require("express");
require("dotenv").config();
require("./DB/connectDB");
const cors = require("cors");
const categoryRouter = require("./Route/CategoryRouter");
const productRouter = require("./Route/ProductRouter");
const contactRouter = require("./Route/ContactRouter");
const subcategoryrouter = require("./Route/SubcategoryRouter");
const bannerrouter = require("./Route/BannerRouter");
const newLanchRouter = require("./Route/NewLanchRouter");
const BlogRouter = require("./Route/BlogRouter.js");

const app = express();
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
  "https://www.assortsmachinetools.com",
  "https://assortsmachinetools.com",
  "https://admin.assortsmachinetools.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.set(express.static("./Public/Image"));
app.use("/Public", express.static("Public"));

app.get("/", (req, res) => {
  res.send("Server Is Running");
});
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", contactRouter);
app.use("/api", subcategoryrouter);
app.use("/api", bannerrouter);
app.use("/api", newLanchRouter);
app.use("/api", BlogRouter);

app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
