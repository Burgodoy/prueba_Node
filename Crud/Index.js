const express = require("express");
const app = express();
const rutaClientes = require("./Clients");

app.use(express.json());

app.use("/clients", rutaClientes);

app.listen(3000, (req, res) =>{
    console.log("Server funcionando en el puerto 3000");
});

