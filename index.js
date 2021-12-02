import fs from 'fs';
import pass from './pass.js'


 
class Manager{
        async save(clase){
            try {
                let data = await fs.promises.readFile("nuevo.json", "utf-8")
                let obJson = JSON.parse(data)
                if (obJson.some(evt => evt.name === clase.name)) {
                    return {status: "error", message: "El nombre de la materia ya eciste" }
                } else {
                    let dataOb = {
                        id:pass(),
                        name: clase.name,
                        descripcion: clase.descripcion,
                        precio: clase.precio,
                        imagen:clase.imagen
                    }

                    obJson.push(dataOb);
                    try {
                        await fs.promises.writeFile("nuevo.json", JSON.stringify(obJson, null, 2))
                        return {status: "success", message: "Clase creada con el id: " + dataOb.id}
                    } catch {
                        return {status: "error", message: "No se pudo crear la clase"}
                    }
                }
            }catch (err){
                let dataOb = {
                    id: pass(),
                    name: clase.name,
                    descripcion: clase.descripcion,
                    precio: clase.precio,
                    imagen:clase.imagen
                }
                try{
                    await fs.promises.writeFile('nuevo.json',JSON.stringify([dataOb],null,2))
                    return {status:"success",message:"Clases creada con el id: " + dataOb.id}
                }catch(error){
                    return {status:"error",message:"No se pudo crear la clase: "+error}
                }
            }
        }
        async getAll() {
            try{
                let data = await fs.promises.readFile("nuevo.json", "utf-8")
                if(data!=0){
                    let obje = JSON.parse(data)
                    return {status:"success", message:obje}
                }else{
                    return {status:"error", message:obje}
                }
            }catch (e){
                return {e}
            }
        }
        async getByid(id){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)
            let nuevo=obj.filter(res=>res.id===id)
            if(nuevo!=0){
                return {status:"succes",message:"Usuario encontrado: " + JSON.stringify(nuevo,null,2)}
            }else{
                return {status:"error",message:"No hay ningun registro"}
            }
        }
        async deleteId(id){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)
            let filtro=obj.filter(res=>res.id===id)
            if(filtro!=0){
                let nuevo=obj.filter(res=>res.id!=id)
                if(nuevo!=0){
                    await fs.promises.writeFile("nuevo.json", JSON.stringify(nuevo, null, 2))
                    return {status:"Eliminado",message:"Usuario eliminado correctamente"}
                }else{
                    await fs.promises.writeFile("nuevo.json", JSON.stringify(nuevo, null, 2))
                    return {status:"error",message:"No existe el usuario"}
                }
            }else{
                return {status:"Error",message:"No se encontro ningun registro con ese id"}
            }
        }
        async deleteAll(){
            let data=await fs.promises.readFile("nuevo.json","utf-8")
            let obj=JSON.parse(data)

            for(let x=obj.length;x>0;x--){
                obj.pop();
            }
            await fs.promises.writeFile("nuevo.json", JSON.stringify(obj, null, 2))
            return {status:"Eliminados",message:"Datos eliminados correctamente"}

        }
        async updateId(id,body){
            try{
                let data = await fs.promises.readFile("nuevo.json","utf-8")
                let users = JSON.parse(data);
                if(!users.some(user=>user.id===id)) return {status:"error", message:"No hay ningún usuario con el id especificado"}
                let result = users.map(user=>{
                    if(user.id===id){
                            body = Object.assign({id:user.id,...body})
                            return body;
                    }else{
                        return user;
                    }
                })
                try{
                    await fs.promises.writeFile('nuevo.json',JSON.stringify(result,null,2));
                    return {status:"success", message:"Usuario actualizado"}
                }catch{
                    return {status:"error", message:"Error al actualizar el usuario"}
                }
            }catch{
                return {status:"error",message:"Fallo al actualizar el usuario"}
            }
        }


}
export default Manager
/*let nuevo=new Manager()
let data={
    name: "Ibiza",
    descripcion: "Color azul",
    precio: 10000
}*/
/*nuevo.save(data).then(res=>{
    console.log(res.message)
})*/
/*nuevo.getAll().then(res=>{
    console.log(res.message)
})*/
/*nuevo.getByid("21-0").then(res=>{
    console.log(res.message)
})*/
/*nuevo.deleteId(3).then(res=>{
    console.log(res.message)
})*/
/*nuevo.deleteAll().then(res=>{
    console.log(res.message)
})*/
/*nuevo.updateId("21-1",data).then(res=>{
    console.log(res)
})*/

