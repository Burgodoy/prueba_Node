const mysql = require("mysql");

const baseDatos = mysql.createConnection({
    host:"localhost",
    database: "prueba_node",
    user: "burgo",
    password:"12345"
});

baseDatos.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log("Conexion Establecida Correctamente");
    }
});

module.exports = baseDatos;