require("dotenv").config();
const restart = require("nodemon");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Conexáo com o DB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-tarefas.yafdh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )

  .then(() => {
    console.log("Conectado ao MongoDB - API Tarefas");
  })

  .catch((err) => console.log(err));

app.listen(3000);

// Lendo o JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Iniciando chamada para as rotas
const healthCheck = require("./routes/healthCheck");
app.use("/", healthCheck);
