import express from 'express';
import Manager from './index.js'
import multer from 'multer';
import __dirname from './utils.js';
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
    
    ini.getAll().then(ress=>{
        let obj=ress.message
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
    ini.getAll().then(ress=>{
        res.send(ress)
    })
 })
router.get("/:id",(req,res)=>{
    ini.getByid(req.params.id).then(response=>{
        res.send(response)
    })
 })
 router.post("/",(req,res)=>{
    ini.save(req.body).then(ress=>{
        res.send(ress.message)
    })
})

router.post("/guardar",upload.single('imagen'),(req,res)=>{
    let dato=req.body
    let image="http://localhost:8080/images/"+req.file.filename
    dato.imagen=image
    ini.save(dato).then(ress=>{
        res.send(ress)
        if(result.status==="success"){
            ini.getAll().then(result=>{
                console.log(result);
                io.emit('prod',result);
            })
        }
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

export default router;