const express = require("express");
const dotenv = require("dotenv");
var path = require("path");
var rfs = require("rotating-file-stream");
const errorHandler = require("./middleware/error");
var morgan = require("morgan");
const logger = require("./middleware/logger");
const fileupload = require("express-fileupload");
const cors = require("cors");

const blogRoute = require("./routes/blog");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const userRoute = require("./routes/user");
const injectDb = require("./middleware/injectDb");

// Аппын тохиргоог process.env рүү ачаалах
dotenv.config({ path: "./config/config.env" });

const db = require("./config/db");
const app = express();

var accessLogStream = rfs.createStream("access.log", {
  interval: "1d", // rotate daily
  path: path.join(__dirname, "log"),
});

app.use(express.json());
app.use(fileupload());
app.use(logger);
app.use(cors({ origin: "http://localhost:3000", optionsSuccessStatus: 200 }));
app.use(injectDb(db));
app.use(morgan("combined", { stream: accessLogStream }));
app.use(errorHandler);
app.use("/api/v1/blog", blogRoute);
app.use("/api/v1/register", registerRoute);
app.use("/api/v1/login", loginRoute);
app.use("/api/v1/user", userRoute);

db.sequelize
  .sync()
  .then((result) => console.log("MySQL сервертэй холбогдлоо."))
  .catch((error) => console.log(error));

const server = app.listen(
  process.env.PORT,
  console.log(`Express сэрвэр ${process.env.PORT} порт дээр аслаа... `)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
