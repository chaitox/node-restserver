const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({
    descripcion : {
        type: String,
        unique: true,
        required: [true, "La categoria es obligatoria"]
    }
});

categoriaSchema.methods.toJSON = function() {

    let categoria = this;
    let categoriaObject = categoria.toObject();
    return categoriaObject;
}

categoriaSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

module.exports = mongoose.model('Categoria', categoriaSchema);