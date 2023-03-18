var anio = new Date().getFullYear();
var meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
let mes = new Date().getMonth();
let mesEnCurso = queMes(mes);
let dia = new Date
let fecha = dia.getDate() +"-"+ mesEnCurso;

function queMes(mes){
    return meses[mes] +"-"+ anio;
}

function fechaActu(){
    const mes = new Date().getMonth();
    const mesEnCurso = queMes(mes);
    const dia = new Date;
    const fecha = dia.getDate() +"-"+ mesEnCurso;
    return fecha;
}

module.exports = {mesEnCurso, fecha, fechaActu, queMes};