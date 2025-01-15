// packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const createError = require("http-errors");
const rateLimit = require("express-rate-limit");
app.use(express.urlencoded({ extended: true }));

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50,
  message: "Too manu request, please try again later",
});

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const uploadImage = require("./utility/uploadImage");
const productRoute = require("./router/productRoute");
const additionalsRoute = require("./router/additionalsRoute");

const { responseForError } = require("./controller/res-controller");
const adminRouter = require("./router/log-reg-router");

mongoose
  .connect("mongodb://127.0.0.1:27017/posproject")
  .then(() => {
    console.table("connected");
    app.listen(process.env.PORT || 7290, () => {
      console.log(`lisenng at port ${process.env.PORT || 7290}`);
    });
  })
  .catch((error) => {
    console.log("failed", error);
  });

app.use("/products", productRoute);
app.use("/admin", adminRouter);
app.use("/additionals", additionalsRoute);

app.post("/uploadimage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((error) => res.status(500).send(error));
});

app.use((req, res, next) => {
  return next(createError(404, "route not found"));
});

//? seprate error handeling
app.use((err, req, res, next) => {
  return responseForError(res, {
    statusCode: err.status,
    message: err.message,
  });
});
