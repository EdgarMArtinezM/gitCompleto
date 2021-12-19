import express from 'express';
import multer from 'multer';
import __dirname from './utils.js';
import Manager from './productManager.js'
const router=express.Router()
const ini=new Manager()

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,__dirname+'/public/images');
    },
    filename:(req,file,cb)=>{
        console.log(file)
        cb(null,Date.now()+file.originalname);
    }
})


const upload= multer({storage:storage})


router.get('/view/getAll',(req,res)=>{
    
    ini.getusers().then(ress=>{
        let obj=ress.payload
        let prepara={
            info: obj
        }
        res.render('ver.handlebars',prepara)
    })
    
})

router.get('/view/guardar',(req,res)=>{
    res.render('guardar.pug')
})


router.get("/getAll",(req,res)=>{
    ini.getusers().then(ress=>{
        res.send(ress)
    })
 })
router.get("/:id",(req,res)=>{
    let id=Number(req.params.id)
    ini.getByid(id).then(response=>{
        res.send(response)
    })
 })
 router.post("/",(req,res)=>{
    ini.register(req.body).then(ress=>{
        res.send(ress.message)
    })
})

router.post("/guardar",upload.single('image'),(req,res)=>{
    let dato=req.body
    let image="http://localhost:8080/images/"+req.file.filename
    dato.image=image
    ini.register(dato).then(ress=>{
        res.send(ress)
        if(ress.status==="succes"){
            ini.getusers().then(result=>{
                io.emit('prod',result.payload);
            })
        }
    })
})

router.delete("/:id",(req,res)=>{
    ini.delete(req.params.id).then(ress=>{
        res.send(ress.message)
    })
})

router.put('/:id',(req,res)=>{
    ini.updateId(req.params.id,req.body).then(ress=>{
        res.send(ress.message)
    })
})

export default router;