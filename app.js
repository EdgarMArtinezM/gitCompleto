import express from 'express';
import router from './routes.js'
import cors from 'cors'
import __dirname from './utils.js';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io';
import Manager from './index.js'
const ini=new Manager()


const app = express();
const PORT = process.env.PORT || 8080;
let server=app.listen(PORT,()=>{
    console.log("Servidor iniciado en la ruta http://localhost:"+PORT)
})
export const io = new Server(server);
//Moddleware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname+'/public'))



app.engine('handlebars',engine())
app.set('views',__dirname+'/views')
app.set('view engine','handlebars')

//Routes
app.use('/api',router)

//socket
io.on('connection', async socket=>{
    console.log(`El socket ${socket.id} se ha conectado`)
    let prod = await ini.getAll();
    socket.emit('prod',prod);

})
