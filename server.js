import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

import config from './config.js'

import CnxMongoDB from './model/DBMongo.js'

import RouterProductos from './router/productos.js'
import RouterCarrito from './router/carrito.js'
import RouterUsuarios from './router/usuarios.js'
import RouterMensajes from './router/mensajes.js'

import RouterUpload from './router/upload.js'

import cors from 'cors'
import { guarda } from './router/guarda.js'

//https://socket.io/
//https://www.npmjs.com/package/socket.io

const app = express()
const http = createServer(app)
const io = new Server(http, {
    cors: { origin: "*" }
})


app.use(cors())

app.use(express.static('public'))

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// ---------------- Atención comunicación WebSockets -----------------
io.on('connection', new RouterMensajes().start(io))

// ------------------ Rutas / endpoints API RESTful -------------------
app.use('/api/productos', guarda, new RouterProductos().start())
app.use('/api/carrito', guarda, new RouterCarrito().start())
app.use('/api/usuarios', new RouterUsuarios().start())

app.use('/api/upload', guarda, new RouterUpload().start())

// para redirección frontend en producción
app.get('*', (req,res) => {
    const { query } = req._parsedOriginalUrl
    //console.log(url)
    //console.log(query)
    res.redirect( '/'+ (query?('?'+query):'') )
})


// ------------------- LISTEN DEL SERVIDOR ---------------------
if(config.MODO_PERSISTENCIA == 'MONGODB') {
    await CnxMongoDB.conectar()
}

const PORT = config.PORT
const server = http.listen(PORT, () => console.log(`Servidor apiRestful ECommerce escuchando en http://localhost:${PORT}`))
server.on('error', error => console.log(`Error en servidor: ${error.message}`))
