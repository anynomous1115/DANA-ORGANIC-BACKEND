const express = require("express");
const app = express();
const routes = require("./routes/v1");
const adminRoutes = require("./routes/admin");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./configs/database");

const port = process.env.PORT || 3030;

connectDB();

dotenv.config();

app.use(cookieParser());

app.use(express.urlencoded());

app.use(express.json());

app.use("/v1", routes);
app.use("/admin", adminRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}`));
