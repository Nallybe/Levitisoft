function listar(req, res) {
    res.render('productos/ProductosDash');
}

/* function crear(req, res) {
    res.render('productos/');
} */
function editar(req, res) {
    res.render('productos/EditarProduc');
}

module.exports={
    listar: listar,
    //crear: crear,
    editar: editar
}