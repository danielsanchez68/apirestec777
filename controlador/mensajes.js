import Servicio from '../servicio/mensajes.js'

class Controlador {

    constructor() {
        this.servicio = new Servicio()
    }

    obtenerMensajes = async () => {
        const mensajes = await this.servicio.obtenerMensajes()
        return mensajes
    }

    guardarMensaje = async mensaje => {
        try {
            const mensajeGuardado = await this.servicio.guardarMensaje(mensaje)
            return mensajeGuardado
        }
        catch(error) {
            return { errMsg: error.message }
        }
    }
}


export default Controlador