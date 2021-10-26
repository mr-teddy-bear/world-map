import { Sequelize } from "sequelize";
import config from "./environment";
import logger from "./winston";

const {
  db: { dbName, dbUser, dbHost, dbPassword },
} = config;

export const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "mysql",
  host: "localhost",
});

export async function initializeDbMysql(callback: (a: Sequelize) => void) {
  try {
    await sequelize.authenticate();
    logger.info(
      `MySQL: Connection has been established successfully to ${sequelize.config.host}`
    );

    await sequelize.sync();
    return callback(sequelize);
  } catch (err: any) {
    logger.error(
      "Sequelize: Unable to connect to the database: " + err.toString()
    );
    process.exit(1);
  }
}
