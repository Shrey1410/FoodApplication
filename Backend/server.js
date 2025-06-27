const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.DB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL
mongoose.connect(URI);
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to database successfully");
});
db.on("error", (err) => {
  console.log("Database connection error:", err);
});
app.use(express.json());
app.use(
  cors({
    origin: `${FRONTEND_URL}`,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());
require("./routes/customer.routes")(app);
require("./routes/vendor.routes")(app)
require("./routes/fooditem.routes")(app)
require("./routes/orders.routes")(app)
require("./routes/sales.routes")(app)
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
