require("dotenv").config();
const restart = require("nodemon");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Conexão com o DB
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api-tarefas.yafdh.mongodb.net/apitarefas?retryWrites=true&w=majority`
  )

  .then(() => {
    console.log("Conectado ao MongoDB - API Tarefas");
  })

  .catch((error) => console.log(error));

app.listen(3000);

// Lendo o JSON
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

// Chamada para as rotas públicas
const healthCheck = require("./routes/public/healthCheck");
app.use("/", healthCheck);

const createUser = require("./routes/public/createUser");
app.use("/", createUser);

const login = require("./routes/public/login");
app.use("/", login);

// Chamada para as rotas privadas
const newTaskList = require("./routes/private/createNewTaskList");
app.use("/", newTaskList);
