const express=require("express")
const app=express()
const port=8000
const rou=require("./routes")
const cors=require('cors')
const corsOptions ={
    origin:'http://localhost:8000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
 

//Moddleware
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/imagenes',express.static(__dirname+'/public'))
app.set("views","./views")
app.set("view engine","pug")
//Routes
app.use('/api/productos',rou)
//Port
app.listen(port,()=>{
    console.log("Servidor iniciado en la ruta http://localhost:"+port)
})
app.on("error",(err)=>console.log("Error en el servidor: "+err))