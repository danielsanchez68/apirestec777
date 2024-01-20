import ModelMongoDB from "./mensajesMongoDB.js"
import ModelMem from "./mensajesMem.js"

class ModelFactory {
    static get(tipo) {
        switch (tipo) {
            case 'MEM':
                console.log('**** Mensajes Persistiendo en Memoria ****')
                return new ModelMem()

            case 'MONGODB':
                console.log('**** Mensajes Persistiendo en MongoDB ****')
                return new ModelMongoDB()
                /* console.log('**** Mensajes Persistiendo en Memoria ****')
                return new ModelMem() */

            default:
                console.log('**** Mensajes Persistiendo en Memoria (default) ****')
                return new ModelMem()
        }
    }
}

export default ModelFactory