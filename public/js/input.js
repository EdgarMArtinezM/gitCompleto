console.log("Hola")
document.addEventListener('submit',function(e){
    e.preventDefault()
    let form=document.getElementById("form")
        let data=new FormData(form)
        //let name=data.get("name")
        // let descripcion=data.get("descripcion")
        // let precio=data.get("precio")
        // let imagen=data.get('imagen')
        // let obj={
        //      name:name,
        //      descripcion:descripcion,
        //      precio:precio,
        //      imagen:imagen
        // }
        fetch("http://localhost:8000/api/productos/guardar",{
             method: 'POST',
             body: data, 
            //  headers:{
            //      'Content-type':'application/json'
            //  }
        })
        .then((result)=>{
             return result.json()
        })
        .then((json)=>{
             console.log(json)
             location.href='http://localhost:8000/api/productos/view/guardar'
        })
})

