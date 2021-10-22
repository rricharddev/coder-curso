class Producto 
{
    constructor(precio,id,title,thumbnailUrl){

        this.precio=precio
        this.id=id     
        this.title=title
        this.thumbnailUrl=thumbnailUrl
        this.cantidad=1
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
            if(this.listaProductos.find(productoC=>productoC.id==producto.id)==undefined)
            this.listaProductos.push(producto);
            else {
                this.listaProductos=this.listaProductos.map((productoC)=>{
                    if(productoC.id==producto.id) 
                    {
                        productoC.cantidad=  productoC.cantidad+1;   
                    }
                    return productoC;


                })

            }
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
            template.querySelector('#cantidad').innerHTML=producto.cantidad
            template.querySelector('#subtotal').innerHTML="$"+ producto.precio*producto.cantidad

            const clone = template.cloneNode(true)
            fragment.appendChild(clone)
    
        })
        contenedorProductos.appendChild(fragment)
    }

}

irCatalogo = ()=> {
    $('#contenedor-productos').show();
    $('#contenedor-carrito').hide();
    $('#liCatalogo').hide();
   document.querySelector('#titlePage').innerHTML = "Productos";


}
 Cargar=async ()=>
{
    catalogo=new Catalgo()
    carrito=new Carrito()
    await catalogo.CargarListaProductos('api.json')
    catalogo.MostrarProductos('#contenedor-productos')

}
MostrarCarrito=()=>
{

    $('#contenedor-productos').hide();
    $('#contenedor-carrito').show();
    $('#liCatalogo').show();
    document.querySelector('#titlePage').innerHTML = "Carrito";
    carrito.MostrarCarrito("#contenedor-carrito");

}
agregarCarrito=(e)=>
{
   let idproducto=e.getAttribute("idproducto")
   carrito.addCarrito(catalogo.listaProductos.filter(producto=> producto.id== idproducto)[0])
   alert("Se agrego el producto al carrito")
}
let catalogo;
let carrito;

$(document).ready(()=>{

    Cargar()

})
 
//

