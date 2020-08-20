const jwt = require('jsonwebtoken');
//===============================================
//vericar token
//===============================================

let verificarToken = (req, res, next)=>{

    let token = req.get('Authorization');


    jwt.verify(token, process.env.SEED, (err, decoded)=>{
        if (err) {
            return res.status(401).json({
                ok: false,
                err:{
                    message: 'Token no valido'
                }
            });
        }

        req.usuario = decoded.usuario;
    });

    next();
};


//==============================
//Verifica admin role
//=============================
let verificarRole = (req, res, next)=>{
    let rolesValidos = {
        values: ['ADMIN_ROLE', 'USER_ROLE'],
        message: '{VALUE} no es un rol valido'
    }
    if (req.role !== 'ADMIN_ROLE') {
        res.json({
            ok: false,
            err: {
                message: 'Solos los administradores pueden actualizar registros'
            }
        });
    }
};

module.exports = {
    verificarToken,
    verificarRole
}