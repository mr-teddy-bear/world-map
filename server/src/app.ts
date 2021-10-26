import express from "express";
import { Sequelize } from "sequelize";
import cookieParser from "cookie-parser";
import winston from "./config/winston";
import router from "./routes";
import logger from "./config/winston";
import { initializeDbMysql } from "./config/mysql";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

initializeDbMysql(() => {
  app.use("/", router);
  app.use("/static", express.static("upload"));

  app.get("*", function (req, res, next) {
    const err = new Error("Page Not Found");
    next(err);
  });
});

app.use(function (err: any, req: any, res: any, next: any) {
  winston.error(
    `${err.status || 500} - ${err.message} - ${req.originalUrl} - ${
      req.method
    } - ${req.ip}`
  );
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).json({ message: err.message });
});

export default app;
