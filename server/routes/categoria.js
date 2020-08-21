const express = require('express');

let { verificaToken, verificaAdmin_Role }=require('../middlewares/autenticacion');

const _ = require('underscore');

let app = express();

let Categoria = require('../models/categoria');


app.get('/categoria',verificaToken,  (req,res)=>{
    Categoria.find({})
        .exec((err, categoria)=>{            
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categoria
            });
        });
});

app.get('/categoria/:id', verificaToken,(req, res)=>{
    let id = req.params.id;
    
    Categoria.findById(id,(err, categoriaDb)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoriaDb
        });
    });
});



app.post('/categoria',verificaToken, (req, res)=>{
    let body = req.body;

    let categoria = new Categoria({
        descripcion : body.descripcion
    });

    categoria.save((err, categoriaDb)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            body
        });
    });
    
});

app.put('/categoria/:id',verificaToken, (req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['descripcion']);

    Categoria.findByIdAndUpdate(id, body, {new: true, useFindAndModify:false}, (err,categoriaDb)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoriaDb
        });
    });
});


app.delete('/categoria/:id', [verificaToken, verificaAdmin_Role],(req, res)=>{
    let id = req.params.id;

    Categoria.findOneAndRemove(id, (err, categoriaDb)=>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        if (!categoriaDb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Categoria no encontrado'
                }
            });           
        }

        res.json({
            ok: true,
            categoria: categoriaDb
        });
    });
});




module.exports = app;