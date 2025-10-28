import mysql from "mysql2/promise";

const dbPool = mysql.createPool({
  host: "localhost",
  user: "root",         
  password: "03052005", 
  database: "BTL_CNPM", 
});

export default dbPool;