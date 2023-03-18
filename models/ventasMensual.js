 const mongoose = require('mongoose');

const schema = mongoose.Schema({
    mes: String,
    vendedores: [
        {
            vendedor: String,
            monto: Number
        }
    ]   
});

const ventas = mongoose.model("02 - VENTA MAYORISTA MENSUAL", schema);

module.exports = ventas;