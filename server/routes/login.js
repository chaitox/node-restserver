const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();

const Usuario = require('../models/usuario');
const { response } = require('express');


app.post('/login', (req, res)=>{

    let body = req.body;
 

    Usuario.findOne( {email: body.email}, (err, usuarioDb)=>{
        if(err){
            return res.status(500).json({
                ok: false,
                err: err
            });
        }

        if (!usuarioDb) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Usuario o contraseña incorrecta.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDb.password)) {
            return res.status(400).json({
                ok: false,
                err:{
                    message: 'Contraseña no es correcta'
                }
            });
        }else{
            let token = jwt.sign({
                usuario : usuarioDb
            }, process.env.SEED , {
                expiresIn: process.env.CADUCIDAD_TOKEN
            });
            return res.status(400).json({
                ok: true,
                usuario:{
                    message: usuarioDb,
                    token
                }
            });
        }
         
    });
   
});















module.exports = app;