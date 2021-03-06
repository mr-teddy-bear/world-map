import dotenv from "dotenv";
import { env } from "process";
// const DOT_ENV_FILE = process.env.NODE_ENV
//   ? `.env.${process.env.NODE_ENV}`
//   : ".env.local";

dotenv.config();

export default {
  app: {
    environment: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    clientUri: process.env.CLIENT_URI,
  },
  db: {
    dbName: process.env.DB_NAME || "newTable",
    dbUser: process.env.DB_USER || "root",
    dbHost: process.env.DB_HOST || "localhost",
    dbPassword: process.env.DB_PASSWORD || "123456Qwerty",
  },
};
