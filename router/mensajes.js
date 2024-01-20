import Controlador from '../controlador/mensajes.js'


class Router {
    constructor() {
        this.controlador = new Controlador()
    }

    start(io) {
        return async socket => {
            console.log('Cliente conectado!')
        
            //emito todos los mensajes al cliente conectado
            socket.emit('mensajes', await this.controlador.obtenerMensajes())
        
            //escucho el nuevo mensaje emitido por el cliente conectado
            socket.on('nuevo-mensaje', async mensaje => {
                console.log('mensaje:', mensaje)
                //mensajes.push(mensaje)
                await this.controlador.guardarMensaje(mensaje)
                
                //emito todos los mensajes al cliente conectado
                //socket.emit('mensajes', mensajes)
        
                //emito todos los mensajes a todos los cliente conectados
                io.sockets.emit('mensajes', await this.controlador.obtenerMensajes())
            })
        }        
    }    
}


export default Router