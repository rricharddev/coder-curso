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
 
            template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
            template.querySelector('#title').innerHTML= producto.title
            template.querySelector('.bottonComprar').setAttribute('idproducto',producto.id)

            const clone = template.cloneNode(true)
            fragment.appendChild(clone)
    
        })
        contenedorProductos.appendChild(fragment)
    }

}

class Carrito 
{

    constructor(){

        this.listaProductos =[]
    }

    
    addCarrito = async (producto) => {
        try{ 
        
            this.listaProductos.push(producto);
        }catch(error){
            console.error(error)
        }
    }
     
    
    MostrarCarrito =  (contendor) => {
        const contenedorProductos = document.querySelector(contendor)
        contenedorProductos.innerHTML="";
        const template = document.querySelector('#template-carrito').content
        const fragment = document.createDocumentFragment()
 
       
        this.listaProductos.forEach(producto => {
            console.log(producto)
            debugger;
            template.querySelector('img').setAttribute('src', producto.thumbnailUrl)
            template.querySelector('#title').innerHTML= producto.title
            template.querySelector('#precio').innerHTML="$"+ producto.precio

            const clone = template.cloneNode(true)
            fragment.appendChild(clone)
    
        })
        contenedorProductos.appendChild(fragment)
    }

}

function irCatalogo () {
    document.querySelector('#contenedor-productos').style.display = "";
    document.querySelector('#contenedor-carrito').style.display = "none";
   document.querySelector('#titlePage').innerHTML = "Productos";
   document.querySelector('#liCatalogo').style.display = "none";



}
async function   Cargar()
{
    catalogo=new Catalgo()
    carrito=new Carrito()
    await catalogo.CargarListaProductos('api.json')
    catalogo.MostrarProductos('#contenedor-productos')

}
async function MostrarCarrito()
{
    document.querySelector('#contenedor-productos').style.display = "none";
    document.querySelector('#contenedor-carrito').style.display = "";
    document.querySelector('#titlePage').innerHTML = "Carrito";
    document.querySelector('#liCatalogo').style.display = "";

    carrito.MostrarCarrito("#contenedor-carrito");

}
async function   agregarCarrito(e)
{
   let idproducto=e.getAttribute("idproducto")
   carrito.addCarrito(catalogo.listaProductos.filter(producto=> producto.id== idproducto)[0])
}
let catalogo;
let carrito;
document.addEventListener("DOMContentLoaded",() => {
  
   Cargar()

})

//

