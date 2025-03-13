const mysql = require("mysql2");

// Configurazione della connessione al database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "blog",
});

db.connect((err) => {
  if (err) {
    console.error("Errore di connessione al database:", err);
    return;
  }
  console.log("Connessione al database MySQL riuscita!");
});

module.exports = db;
