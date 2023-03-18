const mongoose = require('mongoose');

const schema = mongoose.Schema({
    fecha: { type: String, require: true, max: 400 },
    vendedores: [
        [{vendedor: String,
          monto: [Number],
          total: Number  
        }
        ]
    ]
});


ventas = mongoose.model("01 - VENTAS MAYORISTA", schema);

module.exports = ventas;


// const mongoose = require('mongoose');
// let fecha = require("../utils/fecha");
// let date =  new Date;
// const fechaCliente = require("../utils/fechaCliente").fecha;

// const schema = mongoose.Schema({
//     vendedor: { type: String, require: true, max: 400 },
//     monto: { type: Number, require: true, max: 100000000000000 },    
//     fecha: { type: String, require: true, max: 400 },
//     totalVentadiaria: { type: Number, max: 100000000000000 }
// });

// let model = {m: ""};
// let modelName = {name: undefined};

// let ventas;

// if(fechaCliente != undefined){
//     modelName.name = fechaCliente;
//     ventas = mongoose.model(fechaCliente, schema);
// }else{    
//     modelName.name = date.getDate() + "-" + fecha.mesEnCurso
//     ventas = mongoose.model(modelName.name, schema);
// }


//module.exports = ventas;//{model, modelName};