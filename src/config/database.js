/*
 * Title:Postgre Database connection
 * Description:
 * Author: Md Naimur Rahman
 * Date: 29/08/2026
 */

// import pg from "pg";

const { Pool } = require("pg");

console.log(process.env.DATABASE_URL);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// export default pool;

module.exports = pool;
