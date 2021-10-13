class Producto 
{
    constructor(precio,id,title,thumbnailUrl){

        this.precio=precio
        this.id=id     
        this.title=title
        this.thumbnailUrl=thumbnailUrl
    }

    
}

class Catalgo 
{

    constructor(){

        this.listaProductos =[]
    }

    
    CargarListaProductos = async (url) => {
        try{
            const res = await fetch(url)
            const data = await res.json()
            for(let i=0;i<data.length;i++){
                let productoJson=data[i]
                let ProductoC=new Producto(productoJson.precio,productoJson.id,productoJson.title,productoJson.thumbnailUrl)
                this.listaProductos.push(ProductoC)
            }  
        
        }catch(error){
            console.error(error)
        }
    }
     
    
    MostrarProductos =  (contendor) => {
        const contenedorProductos = document.querySelector(contendor)

        const template = document.querySelector('#template-productos').content
        const fragment = document.createDocumentFragment()
 
       
        this.listaProductos.forEach(producto => {
            console.log(producto)
            template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
            template.querySelector('#title').innerHTML= producto.title
            template.querySelector('#precio').innerHTML="$"+ producto.precio

            const clone = template.cloneNode(true)
            fragment.appendChild(clone)
    
        })
        contenedorProductos.appendChild(fragment)
    }

}
async function   Cargar()
{
    catalogo=new Catalgo()

    await catalogo.CargarListaProductos('api.json')
    catalogo.MostrarProductos('#contenedor-productos')

}
let catalogo;
document.addEventListener("DOMContentLoaded",() => {
  
   Cargar()

})

//👍

