import mongoose from 'mongoose'

const usuarioSchema = mongoose.Schema({
    usuario: String,
    password: String,
    admin: Boolean
},{versionKey: false})

export const UsuarioModel = mongoose.model('usuarios', usuarioSchema)