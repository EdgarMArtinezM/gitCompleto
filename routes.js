const { Router } = require("express")
const express=require("express")
const router=express.Router()
const classObj=require("./index")
const ini=new classObj()
const multer=require("multer")

const storage=multer.diskStorage({
    destination: function (req,file,cb){
        cb(null,'public')
    },
    filename: function (req,file,cb){
        console.log(file)
        cb(null,file.originalname)
    }
})


const upload= multer({storage:storage})

router.get('/view/getAll',(req,res)=>{

    ini.getAll().then(ress=>{
        let obj=ress.message
        let prepara={
            info: obj
        }
        res.render('ver.pug',prepara)
    })
    
})

router.get('/view/guardar',(req,res)=>{
    res.render('guardar.pug')
})


router.get("/getAll",(req,res)=>{
    ini.getAll().then(ress=>{
        res.send(ress)
    })
 })
router.get("/:id",(req,res)=>{
    ini.getByid(req.params.id).then(response=>{
        res.send(response.message)
    })
 })
 router.post("/",(req,res)=>{
    ini.save(req.body).then(ress=>{
        res.send(ress.message)
    })
})

router.post("/guardar",upload.single('imagen'),(req,res)=>{
    let dato=req.body
    let image="http://localhost:8000/imagenes/"+req.file.filename
    dato.imagen=image
    ini.save(dato).then(ress=>{
        res.send(ress)
    })
})

router.delete("/:id",(req,res)=>{
    ini.deleteId(req.params.id).then(ress=>{
        res.send(ress.message)
    })
})

router.put('/:id',(req,res)=>{
    ini.updateId(req.params.id,req.body).then(ress=>{
        res.send(ress.message)
    })
})

module.exports=router