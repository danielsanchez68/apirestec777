import CnxMongoDB from "../../DBMongo.js"
import { UsuarioModel } from "../models/usuario.js"

class ModelMongoDB {

    obtenerUsuarios = async () => {
        if(!CnxMongoDB.connection) return []
        const usuarios = await UsuarioModel.find({})
        return usuarios
    }

    guardarUsuario = async credenciales => {
        if(!CnxMongoDB.connection) return {}
        const usuarioModel = new UsuarioModel(credenciales)
        const usuarioGuardado = await usuarioModel.save()
        return usuarioGuardado
    }
}

export default ModelMongoDB