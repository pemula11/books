import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

console.log(process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false, // Matikan logging query jika tidak perlu
  }
);

const syncDatabase = async () => {
    try {
      await sequelize.sync({ force: false }); // Set true jika ingin menghapus tabel lama
      console.log("Database & tables synced!");
    } catch (error) {
      console.error("Error syncing database:", error);
    }
  };



export { sequelize, syncDatabase };

