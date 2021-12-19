//sockets
const socket=io()
socket.on('prod',data=>{
    console.log(data)
let prod = data.payload;
    fetch('templates/prodTable.handlebars').then(string=>string.text()).then(template=>{
        const processedTemplate = Handlebars.compile(template);
        const templateObject={
            prod:prod
        }
        const html = processedTemplate(templateObject);
        let div = document.getElementById('petTable');
        div.innerHTML=html;
    })
})
///////////////
document.addEventListener('submit',function(e){
    e.preventDefault()
    let formulario=document.getElementById("form")
        let data=new FormData(formulario)
        let name=data.get("name")
        let descripcion=data.get("description")
        let precio=data.get("price")
        let imagen=data.get('image')
        let obj={
             name:name,
             descripcion:descripcion,
             precio:precio,
             imagen:imagen.name
        }
        console.log(obj)
        fetch("http://localhost:8080/api/guardar",{
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
             location.href='http://localhost:8080/'
        })
})

