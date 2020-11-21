const express = require(`express`);
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.use(bodyParser.json());
const usuarioRoutes = require("./rotas/usuarios");
const obraRoutes = require("./rotas/obras");

mongoose
  .connect(
    "mongodb+srv://fefa:senha@cluster0.y6usl.mongodb.net/projeto?retryWrites=true&w=majority"
  )
  .then(() => console.log("Conexão OK"))
  .catch(() => console.log("Conexão NOK"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type,Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/api/obras", obraRoutes);

module.exports = app;
