const express = require("express");
const router = express.Router();
const baseDatos = require("../baseDatos.js")

//Middle
function usuarioRegistrado(req, res, next){
    const valores = req.body;
    const busquedaEmail = `SELECT email FROM clientes WHERE email = '${valores.email}'`;
    baseDatos.query(busquedaEmail, function(error, resultado){
        if(error){
            console.log(error);
            return res.send("Error en el correo proporcioando");
        }
        if(resultado.length > 0){
            return res.send("Correo electronico ya registrado, intente otro o ponganse en contacto con soporte");
        }
        next();
    })
}

function validName(req, res, next){
    const name = req.body.name;
    if(name === ''){
        return res.send("Nombre vacio, favor de rellenar el campo");
    }
    next();
}

function validPass(req, res, next){
    const pass = req.body.password;
    if(pass === ''){
        return res.send("Campo de Contraseña vacio, favor de rellenar el campo")
    }
    next();
}

function validEmail(req, res, next){
    const valores = req.body;
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(regex.test(valores.email)){
        next();
    }else{
       return res.send("Correo proporcionado NO VALIDO favor de verificarlo");
    }
}

function validPhone(req, res, next){
    const valores = req.body;
    let regex = /^\d{10}$/;
    if(regex.test(valores.phone)){
        next();
    }else{
        return res.send("Telefono proporcionado NO VALIDO favor de verificarlo")
    }
}

//Rutas
router.post("/altaUsuario", usuarioRegistrado, validName, validEmail, validPass, validPhone, (req, res) =>{
    const valores = req.body;
    const queryAdd = `INSERT INTO clientes (name, email, password, phone) VALUES ('${valores.name}','${valores.email}','${valores.password}','${valores.phone}')`;
    baseDatos.query(queryAdd, function(error){
        if(error){
            return res.send("Error al agregar al usuario");
        }
        return res.send("Usuario registrado correctamente");
    })
})

router.put("/:id/edit", validName, validEmail, validPass, validPhone, (req, res) =>{
    const idUser = req.params.id;
    const valores = req.body;
    const code = `UPDATE clientes SET name = ?, email = ?, password = ?, phone = ? WHERE idUser = '${idUser}'`;
    baseDatos.query(code, [valores.name, valores.email, valores.password, valores.phone], function(error){
        if(error){
           return res.send("Error al modificar el usuario");
        }
        return res.send("El Usuario fue modificado satisfactoriamente");
    })
})

router.get("/usuarios/todos", (req, res) =>{
    baseDatos.query("SELECT * FROM clientes", function(error, resultado){
        if(error){
            throw error;
        }
        return res.send(resultado);
    })
})

router.get("/usuarios/:id", usuarioRegistrado, (req, res) =>{
    const idUser = req.params.id
    baseDatos.query(`SELECT * FROM clientes WHERE idUser = '${idUser}'`, function(error, resultado){
        if(error){
            throw error;
        }
        return res.send(resultado);
    })
})

router.delete("/usuarios/eliminar/:id", (req, res) =>{
    const idUser = req.params.id
    baseDatos.query(`DELETE FROM clientes WHERE idUser = ${idUser}`, function(error){
        if(error){
            throw error;
        }
        return res.send("Usuario Eliminado ");
    })
})

module.exports = router