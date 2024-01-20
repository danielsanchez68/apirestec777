class ModelMem {

    constructor() {
        this.mensajes = [/* 
            { autor: 'Pepe', texto: 'Hola que tal!' },
            { autor: 'Juan', texto: 'Muy bien' },
            { autor: 'Ana', texto: 'Bárbaro!' },
         */]
    }

    obtenerMensajes = async () => this.mensajes

    guardarMensaje = async mensaje => {
        mensaje.id = String(parseInt(this.mensajes[this.mensajes.length-1]?.id || 0) + 1)
        this.mensajes.push(mensaje)
        return mensaje
    }
}

export default ModelMem