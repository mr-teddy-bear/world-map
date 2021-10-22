import express from "express";
import cookieParser from "cookie-parser";
import winston from "./config/winston";
import router from "./routes";
import { Sequelize } from "sequelize";
import config from "./config/environment";
import logger from "./config/winston";

const {
  db: { dbName, dbUser, dbHost, dbPassword },
} = config;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: "localhost",
});

async function initializeDbMysql(callback) {
  try {
    await sequelize.authenticate();
    logger.info(
      `MySQL: Connection has been established successfully to ${sequelize.config.host}`
    );

    await sequelize.sync();
    return callback(sequelize);
  } catch (err) {
    logger.error(
      "Sequelize: Unable to connect to the database: " + err.toString()
    );
    process.exit(1);
  }
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

initializeDbMysql(() => {});
app.use("/", router);

app.get("*", function (req, res, next) {
  const err = new Error("Page Not Found");
  next(err);
});

app.use(function (err, req, res, next) {
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message });
});

export default app;
