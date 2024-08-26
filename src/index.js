const express = require("express");
const app = express();
const routes = require("./routes/v1");
const adminRoutes = require("./routes/admin");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./configs/database");
const cors = require("cors");
// const cloudinary = require("cloudinary").v2;

const port = process.env.PORT || 3030;

connectDB();

dotenv.config();

app.use(
  cors({
    origin: "http://localhost:3000", // Thay thế bằng URL của ứng dụng React
    credentials: true,
  })
);

// app.use(cloudinary());
app.use(cookieParser());

app.use(express.urlencoded());

app.use(express.json());

app.use("/v1", routes);
app.use("/admin", adminRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
