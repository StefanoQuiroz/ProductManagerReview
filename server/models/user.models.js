const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required : [true, "Se requiere ingresar el nombre"]
    },
    email: {
        type: String,
        required: [true, "Se requiere ingresar el email"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message : "Email inv@lido"
        }
    },
    password: {
        type: String,
        required: [true, "Se require ingresar la descripción"],
        minlength : [8, "Password debe tener al menos 5 caracteres"]
    }
}, {timestamps:true});

UserSchema.virtual('confirmPassword')
    .get( ()=> this._confirmPassword )
    .set( value => this._confirmPassword = value)

UserSchema.pre('validate', function(next){
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Las contraseñas deben ser iguales!!')
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then(result =>{
            this.password = result;
            next();
        });
})

const User = mongoose.model('Users', UserSchema);

module.exports = User;