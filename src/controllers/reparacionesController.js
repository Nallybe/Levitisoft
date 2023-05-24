function listar(req, res) {
    res.render('reparaciones/reparaciones');
}
function crear(req, res) {
    res.render('reparaciones/reparaciones_agregar');
}
function editar1(req, res) {
    res.render('reparaciones/reparaciones_editar');
}
function editar2(req, res) {
    res.render('reparaciones/reparaciones_editar2');
}
function detallar(req, res) {
    res.render('reparaciones/reparaciones_detalle');
}

module.exports={
    listar: listar,
    crear: crear,
    editar1: editar1,
    editar2: editar2,
    detallar: detallar
}