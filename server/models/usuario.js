const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuarioShema = new Schema({
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email:{
        type: String,
        required:[true, 'El correo es necesario'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'La contraseña es Obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false,
        enum: rolesValidos
    },
    estado: {
        default: true,
        type: Boolean
    },//boleano
    google: {
        default: false,
        type: Boolean
    }//booleano
});

//borramos el password para que el usuario o programador no pueda ver el campo
usuarioShema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();

    delete userObject.password;
    return userObject;
}

usuarioShema.plugin(uniqueValidator, {message: '{PATH} debe de ser unico'});
module.exports = mongoose.model('usuario', usuarioShema);