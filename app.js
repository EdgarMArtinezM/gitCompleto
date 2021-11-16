const express=require("express")
const app=express()
const port=8080
const rou=require("./routes")
//Moddleware
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//Routes
app.use('/api/productos',rou)
//Port
app.listen(port,()=>{
    console.log("Servidor iniciado en la ruta http://localhost:"+port)
})
app.on("error",(err)=>console.log("Error en el servidor: "+err))