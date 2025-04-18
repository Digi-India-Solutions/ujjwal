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
const enquiryRouter = require("./Route/EnquiryRouter.js");
const subscription = require("./Model/SubscriptionModel.js");
const subscriptionRouter = require("./Route/SubscriptionRouter.js");
const infoCartRouter = require("./Route/InfoCartRouter.js")
const UserRouter = require("./Route/UserRouter.js");
const app = express();

app.use(express.json());
app.set(express.static("./Public/Image"));
app.use("/Public", express.static("Public"));
app.use(
  cors({
    origin:[
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "https://www.assortsmachinetools.com",
      "https://assortsmachinetools.com",
      "https://admin.assortsmachinetools.com",
    ],
    methods: "GET,POST,DELETE,PATCH,PUT",
  })
);
// app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Server Is Running");
});
app.use("/api/v1/auth",UserRouter)
app.use("/api", categoryRouter);
app.use("/api", productRouter);
app.use("/api", contactRouter);
app.use("/api", subcategoryrouter);
app.use("/api", bannerrouter);
app.use("/api", newLanchRouter);
app.use("/api", BlogRouter);
app.use("/api",enquiryRouter)
app.use("/api",subscriptionRouter)
app.use("/api",infoCartRouter)
app.listen(process.env.PORT, () => {
  console.log(`server is running at ${process.env.PORT}`);
});
