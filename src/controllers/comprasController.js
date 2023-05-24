function listar(req, res) {
    res.render('compras/compras');
}

function crear(req, res) {
    res.render('compras/compras_registrar');
}
function detallar(req, res) {
    res.render('compras/compras_detalle');
}
function anular(req, res) {
    res.render('compras/compras_anular');
}

module.exports= {
    listar: listar,
    crear: crear,
    detallar: detallar,
    anular: anular
}