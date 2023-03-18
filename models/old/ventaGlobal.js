const mongoose = require('mongoose');
let fecha = require("../../utils/fecha");
let date =  new Date;
const fechaCliente = require("../../utils/fechaCliente").fecha;

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