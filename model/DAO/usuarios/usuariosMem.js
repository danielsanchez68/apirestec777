class ModelMem {

    constructor() {
        this.usuarios = []
    }

    obtenerUsuarios = async () => this.usuarios

    guardarUsuario = async credenciales => {
        credenciales.id = String(parseInt(this.usuarios[this.usuarios.length-1]?.id || 0) + 1)
        this.usuarios.push(credenciales)
        return credenciales
    }
}

export default ModelMem