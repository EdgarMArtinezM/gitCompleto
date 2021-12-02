//sockets
const socket=io()
socket.on('prod',data=>{
let prod = data.message;
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

