function listar(req, res) {
    res.render('produccion/produccion');
}

function crear(req, res) {
    res.render('produccion/produccion_agregar');
}
function editar_iniciado(req, res) {
    res.render('produccion/produccion_editar_iniciado');
}
function editar_proceso(req, res) {
    res.render('produccion/produccion_editar_proceso');
}
function detallar(req, res) {
    res.render('produccion/produccion_detalle');
}
function detallar_iniciado(req, res) {
    res.render('produccion/produccion_detalle_iniciado');
}
function detallar_terminado(req, res) {
    res.render('produccion/produccion_detalle_terminado');
}

module.exports={
    listar:listar,
    crear:crear,
    editar_iniciado:editar_iniciado,
    editar_proceso:editar_proceso,
    detallar:detallar,
    detallar_iniciado:detallar_iniciado,
    detallar_terminado:detallar_terminado
}