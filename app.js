const express = require("express");
const cors = require("cors");
const db = require("./data/db");
const router = require("./routers/posts");
const notFound = require("./middlewares/notFound");
const errorsHandler = require("./middlewares/errorsHandler");

const app = express();
const port = 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);
app.use(express.json());
app.use(express.static("public"));

// Rotte
app.use("/api/posts", router);

app.get("/img/:imageName", (req, res) => {
  res.send(`<img src="/public/img/${req.params.imageName}" alt="Immagine">`);
});

app.get("/", (req, res) => {
  res.send("Server del mio blog");
});

// Middleware per gestire le rotte non trovate
app.use(notFound);

// Middleware per la gestione degli errori globali
app.use(errorsHandler);

// Avvia il server
app.listen(port, () => {
  console.log(`Server avviato su http://localhost:${port}`);
});
