import server from "./db.js";
export default class Manager {
    constructor(){
        server.schema.hasTable('products').then(res=>{
            if(!res){
                server.schema.createTable('products',table=>{
                    table.increments();
                    table.string('name').notNullable();
                    table.string('description').notNullable();
                    table.integer('price').notNullable();
                    table.string('image');
                    table.timestamp(true,true)
                }).then(result=>{
                    console.log('Created table')
                })
            }
        })
    }
    async getusers(){
        try{   
            let products=await server.table('products').select();
            if(products!=0){
                return {status:'succes',payload:products}
            }else{
                return {status:'succes',payload:'No se encuentra ningun registro'}
            }
        }catch(e){
            return {status:'error',message:'No se encontraron los usuarios '+e}
        }
        
    }
    async getByid(id){
        try{   
            let product=await server.table('products').select().where('id',id).first();
            if(product){
                return {status:'succes',payload:product}
            }else{
                return {status:'succes',message:'No hay ningun resultado'}
            } 
        }catch(e){
            return {status:'error',message:'No se encontraron los usuarios '+e}
        }
    }
    async register(product){
        try{
            let result=await server.table('products').insert(product)
            return {status:'succes',payload:result[0]} 
        }catch(e){
            return {status:'error',message:'No se registro '+e}
        }
    }
    async delete(id){
        try{
            let result=await server.table('products').delete().where('id',id)
            return {status:'succes',message:'Usuario eliminado correctamente'} 
        }catch(e){
            return {status:'error',message:'No se registro '+e}
        }
    }
}
