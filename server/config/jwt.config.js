const jwt = require('jsonwebtoken');

const secret = "esto es secreto";

const authenticate = (req, res, next) => {
    jwt.verify(req.cookies.usertoken, secret, (err, payload)=>{
        if(err){
            res.status(401).json({verified: false})
        }
        else{
            next();
        }
    })
}

module.exports = {secret, authenticate};