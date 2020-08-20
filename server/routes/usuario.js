const express = require('express');
const app = express()
const bcrypt = require('bcrypt');
const _ = require('underscore');


const Usuario = require('../models/usuario');
//se extrae la funcion verificarToken por medio de la destructuracion
const { verificarToken, verificarRole } = require('../middlewares/authetication');
//=================================================================
const { request } = require('express');


//para utilizar tokens se utilizan los middlewares
    app.get('/usuario', verificarToken , function (req, res) {

       
        
        let desde = req.query.desde || 0;
        desde = Number(desde);

        let limite = req.query.limite || 5;
        limite = Number(limite);

        Usuario.find({  }, 'nombre email role estado google')
            .skip(desde)
            .limit(limite)
            .exec((err, usuarios)=>{
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err: err
                    });
                }
                
                    res.json({
                    ok: true,
                    usuarios,
                    conteo
                    });
                
            
            });
    });
 
  


  app.post('/usuario', [verificarToken, verificarRole],  function (req, res) {
      let body = req.body
      let usuario = new Usuario({
          nombre : body.nombre,
          email : body.email,
          password: bcrypt.hashSync(body.password, 10),
          role: body.role
      });

      usuario.save( (err, usuarioDb) =>{

        if(err){
            return res.status(400).json({
                ok: false,
                err: err
            });
        }

       // usuarioDb.password = null;

        res.json({
            ok: true,
            usuario: usuarioDb
        });

      });
      
      
    });

  
    app.put('/usuario/:id', [verificarToken, verificarRole], function (req, res) {
        let id = req.params.id;
        let body = _.pick(req.body,  ['nombre',
        'edad',
        'img',
        'role',
        'estado']);
       
        Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, usuarioDb)=>{
           
            if(err){
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            res.json({
                ok: true,
                usuarioDb
            })

        });
      
    });


    
    app.delete('/usuario/:id', [verificarToken, verificarRole],  function (req, res) {
     

        let id = req.params.id;

        let cambiaEstado = {
            estado: false
        }
        //Usuario.findByIdAndRemove(id, ,(err, usuarioBorrado)=>{
        Usuario.findByIdAndUpdate(id, cambiaEstado  ,(err, usuarioBorrado)=>{
            if(err){
                return res.status(400).json({
                    ok: false,
                    err: err
                });
            }
            if (!usuarioBorrado) {
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'Usuario no existe o ya ha sido borrado.'
                    }
                })
            }
            res.json({
                ok: true,
                usuario: usuarioBorrado
            });
        });






    });

    module.exports = app;