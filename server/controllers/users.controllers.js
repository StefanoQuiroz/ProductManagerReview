const User = require('../models/user.models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

const findUser = (req, res) => {
    User.find({})
        .then(results => res.json({datos:results}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}
const findOneUser = (req, res) => {
    User.findById(req.params.id)
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}
const createUser = (req, res) => {
    User.create(req.body)
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(500);
        })
}
const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(500);
        })
}
const deleteUser = (req, res) => {
    User.deleteOne({_id:req.params.id})
        .then(result => res.json({datos:result}))
        .catch(err => {
            res.json({error:err});
            res.sendStatus(404);
        })
}

const login = (req, res) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result === null){
                res.json({error: true, message:"User and password doesn´t exists"})
            } else {
                bcrypt.compare(req.body.password, result.password)
                .then(isValid => {
                    if(isValid){
                        const payload = {
                            _id : result._id,
                            nombre: result.nombre,
                            email: result.email
                        }
                        const token = jwt.sign(payload, secret);
                        res.cookie("usertoken", token, secret, {httpOnly: true}).json({message:"success!!", data: payload})

                    } else{
                        res.json({error: true, message: "Password invalidate"})
                    }


                })
                .catch(err => res.json({error: err, message: "User and password are invalidate"}))
            }       
        })
        .catch(err => res.json({error:err, message: "User and passwords are invalidate"}))

}

module.exports = {findUser, findOneUser, createUser, updateUser, deleteUser, login};