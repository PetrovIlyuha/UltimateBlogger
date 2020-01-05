const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
// bringing in routes
const blogRoutes = require("./routes/blog");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");

// app
const app = express();

// db connection
mongoose
  .connect(process.env.DATABASE_CLOUD, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log("✔ Mongo Atlas cluster connected..."));

// middlewares
app.use(morgan("dev")); // logger
app.use(bodyParser.json());
app.use(cookieParser());

// cors middleware
if (process.env.NODE_ENV === "development") {
  app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// routes middleware
app.use("/api", blogRoutes);
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);

// port
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✔ Server is listening on http://localhost:${port}`);
});
