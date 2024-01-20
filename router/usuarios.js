import express from 'express'
import Controlador from '../controlador/usuarios.js'

class Router {
    constructor() {
        this.router = express.Router()
        this.controlador = new Controlador()
    }

    start() {
        this.router.post('/login', this.controlador.loginUsuario)
        this.router.post('/register', this.controlador.registerUsuario)
        this.router.post('/token', this.controlador.validarToken)

        return this.router
    }    
}


export default Router