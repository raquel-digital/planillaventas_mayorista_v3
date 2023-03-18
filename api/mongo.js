const { async } = require("rxjs");
const ventaDiaria = require("../models/ventaDiarias");
const ventaMensual = require("../models/ventasMensual");

const mongo = {
    leer: async function (fecha) {
        try{
            const find = await ventaDiaria.find({fecha: fecha});            
            return find;
        }catch(err){
            console.log("ERROR EN LEER FUNCTION MONGO " + err);
        }        
    },
    ingresarVenta: async function (data) {
        const fechaDeVenta = await ventaDiaria.find({fecha: data.fecha});
        
        if(fechaDeVenta.length == 0){
            const firstData = {
                fecha: data.fecha,
                vendedores: [{
                    vendedor: data.vendedor,
                    monto: [data.monto],
                    total: data.monto
                }]
            }
            await ventaDiaria.create(firstData);
        }else{
            try{
                
                fechaDeVenta[0].vendedores.forEach(e => {
                    let exist = false;
                    e.forEach(vendedor => {
                        if(vendedor.vendedor === data.vendedor){
                            vendedor.monto.push(data.monto);
                            vendedor.total += data.monto;
                            exist = true;
                        }
                    }); 
                    if(!exist){
                        const newVendedor = {
                          vendedor: data.vendedor,
                          monto: [data.monto],
                          total: data.monto
                        }
                        e.push(newVendedor);
                    }              
                });
                await ventaDiaria.create(fechaDeVenta[0])
            }catch(err){
                console.log("ERROR EN INGRESO VENTA GLOBAL", err)
            }
            
        }
    },
    ventasMensuales: async function (data) {

        const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
       'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        const fechaSplit = data.fecha.split("/");
        const mes = meses[fechaSplit[1]-1]+"-"+fechaSplit[2]

        const find = await ventaMensual.find({ mes: mes });

        if(find.length == 0){
            const firstData = {
                mes: mes,
                vendedores: [
                    {
                        vendedor: data.vendedor,
                        monto: data.monto
                    }
                ]   
            };

            await ventaMensual.create(firstData);
        }else{
            //console.log(find)
            try{
                let exist = false;                
                find[0].vendedores.forEach(e => {
                        if(e.vendedor === data.vendedor){  
                            console.log("find")                          
                            e.monto += data.monto;
                            exist = true;
                        }
                    }); 
                    if(!exist){
                        const newVendedor = {
                          vendedor: data.vendedor,
                          monto: data.monto
                        }
                        find[0].vendedores.push(newVendedor);
                    }
                await ventaMensual.create(find[0])
            }catch(err){
                console.log("ERROR EN funtion ventasMensuales", err)
            }
            
        }

        

        console.log(mes + " - " + fechaSplit[2]);
    }  
}

module.exports = mongo;