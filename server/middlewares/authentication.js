//
// Check token
//
const jwt = require('jsonwebtoken');

let checkToken = (req, res, next) => {
    
    let token = req.get('token');
    console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if(err){
            return res.status(401).json({
                ok:false,
                err
            });
        }
        req.user = decoded.user;
        next();
    })
};

//
// check user role
//

let checkRole = (req, res, next) => {

    let user = req.usuario;

    if (usuario.role === 'ADMIN_ROLE') {
        next();
    } else {

        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
};
module.exports = {checkToken};