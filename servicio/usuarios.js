import ModelFactory from '../model/DAO/usuarios/usuariosFactory.js'
import config from '../config.js'

import jwt from 'jsonwebtoken'


class Servicio {

    constructor() {
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }

    loginUsuario = async credenciales => {
        const usuarios = await this.model.obtenerUsuarios()

        console.log(credenciales)
        console.log(usuarios)

        const usuarioLogueadoOk = usuarios.filter(c => c.usuario === credenciales.usuario && c.password === credenciales.password )
        if(usuarioLogueadoOk.length === 1) {
            const usuario = usuarioLogueadoOk[0].usuario
            const admin = usuarioLogueadoOk[0].admin

            //https://www.npmjs.com/package/jsonwebtoken
            //https://jwt.io/
            //https://www.jstoolset.com/jwt
            const payload = {
                usuario,
                admin
            }
            const token = jwt.sign(payload, config.LLAVE, { expiresIn: 1200 } )
            console.log(token)
            return { status: 'loginOk', usuario, admin, token }
        }
        else {
            return { status: 'loginError' }
        }
    }

    registerUsuario = async credenciales => {
        const usuarioRegistrado = await this.model.guardarUsuario(credenciales)
        return usuarioRegistrado
    }

    validarToken = async datos => {
        const { token } = datos

        let rta = {}
        if(token) {
            jwt.verify(token, config.LLAVE, (err, decoded) => {
                if(err) {
                    rta = { error: true, mensaje: 'Token no válida' }
                }
                else {
                    rta = { error: false, decoded }
                }
            })
        }
        else {
            rta = { error: true, mensaje: 'Token no provista' }
        }

        return rta
    }
}

export default Servicio

