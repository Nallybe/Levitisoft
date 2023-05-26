function listar(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT ui.idInfo, ui.idAccess, ui.documento, ui.nombre, ui.telefono, COUNT(v.idVentas) AS numero_ventas, COUNT(r.idReparaciones) AS numero_reparaciones, ui.estado FROM users_info ui LEFT JOIN tbl_ventas v ON ui.idInfo = v.idInfo LEFT JOIN tbl_reparaciones r ON ui.idInfo = r.idInfo GROUP BY ui.idInfo, ui.idAccess, ui.nombre, ui.telefono, ui.estado;', (err, clientes) => {
            if (err) {
                res.json(err);
            }
            res.render('clientes/clientes', { clientes });
        });
    });

}

function crear(req, res) {
    req.getConnection((err, conn) => {
        conn.query("SELECT * FROM users_info", (err, clientes) => {
            if (err) {
                res.json(err);
            } else {
                res.render("clientes/clientes_agregar", { clientes });
            }
        })
    });
}

function registrar(req, res) {
    const data = req.body;
    console.log(data)
    const RegistroUser = {
        documento: data.documento,
        nombre: data.nombre,
        telefono: data.telefono,
        estado: data.estado,
    };
    console.log(RegistroUser)

    req.getConnection((err, conn) => {
        conn.query(
            "INSERT INTO users_info SET ?",
            [RegistroUser],
            (error, result) => {
                if (error) {
                    console.log(error);
                    return;
                } else {
                    console.log("Información del usuario guardado");
                }
                res.redirect("/clientes");
            }
        );
    });
}

function editar(req, res) {
    const idInfo = req.params.idInfo;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM users_info WHERE idInfo = ?', [idInfo], (err, info) => {
            if (err) {
                res.json(err);
            }
            res.render('clientes/clientes_editar', { info });
        });
    });
}

function actualizar(req, res) {
    const idInfo = req.params.idInfo;
    const data = req.body;
    req.getConnection((err, conn) => {
        if (err) {
            console.error('Error de conexión: ', err);
            return;
        }
        conn.query('UPDATE users_info SET ? WHERE idInfo = ?', [data, idInfo], (err, rows) => {
            if (err) {
                console.error('Error al actualizar los datos: ', err);
                return;
            } else
                console.log("Se actualizaron los datos")

            res.redirect('/clientes');
        });
    });
}

module.exports = {
    listar: listar,
    crear: crear,
    registrar: registrar,
    editar: editar,
    actualizar: actualizar
}