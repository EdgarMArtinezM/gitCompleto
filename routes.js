const { Router } = require("express")
const express=require("express")
const router=express.Router()
const classObj=require("./index")
const ini=new classObj()

router.get('/',(req,res)=>{
    res.send(`<h1>Bienvenidos Equipo</h1>`)
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