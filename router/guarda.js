import jwt from 'jsonwebtoken'
import config from '../config.js'

export const guarda = (req,res,next) => {
    const token = req.headers['access-token']

    if(token) {
        jwt.verify(token, config.LLAVE, (err, decoded) => {
            if(err) {
                res.json({mensaje: 'Token no válida'})
            }
            else {
                req.decoded = decoded
                next()
            }
        })
    }
    else {
        res.json({mensaje: 'Token no provista'})
    }
}