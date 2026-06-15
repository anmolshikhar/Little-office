import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "ANMOL",
  password: "ANMOL123@",
  database: "LITTLE",
});

connection.connect((err) => {
  if (err) {
    console.log("Connection Failed ❌", err);
  } else {
    console.log("Connected to MySQL ✅");
  }
});

export default connection;