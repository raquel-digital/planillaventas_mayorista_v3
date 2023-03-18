// inicializamos la conexion
const socket = io.connect();
const formulario = document.querySelector(".formulario");
const date =  new Date;
const fecha = date.toLocaleDateString();
document.querySelector("#fecha-actual").innerHTML = fecha;

let ventas = 0;
let act;

socket.emit("newSession", fecha);
socket.on("action", data => act = data)

socket.on("start", data => {
    if(data){        
        inicio(data);
    }
})

formulario.addEventListener("click", event => {
 const mouse = event.target;
 if(mouse.classList.contains('venta')){
    const montoVenta = Number(mouse.previousElementSibling.value);
    const vendedor = mouse.parentElement.childNodes[1].textContent;
    if(montoVenta == 0){
        return;
    }
    let confirm = window.confirm(vendedor + " venta: $ " + montoVenta);
    if(confirm){                
        socket.emit("nuevaVenta", {fecha: fecha, vendedor: vendedor, monto: montoVenta});
        return;
    }else{
        alert("venta cancelada");
        return;
    }
 }    
})

function inicio(data){
    ventas = 0;
    
    if(data.vendedores.length > 0){
        const reporte = document.querySelector(".reporte");
        reporte.innerHTML = "";
        data.vendedores.forEach(e => {
            e.forEach(e => {
                document.querySelector("." + e.vendedor).innerHTML =`<p>${e.total}</p>`;
                reporte.innerHTML += `<li>${fecha} ${e.vendedor}: venta: ${e.monto}</li>`;
                ventas += e.total;
            })    
        })
    }    
}

function salir(){
    var salir = prompt("clave");
    if(salir === act){
        alert("El total de venta es " + ventas)
    }
}



