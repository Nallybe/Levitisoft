const Swal = require('sweetalert2');

function listar(req, res) {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tbl_insumos', (err, insumos) => {
      if (err) {
        res.json(err);
      }
      res.render('insumos/insumos', { insumos });
    });
  });
}

function crear(req, res) {
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM tbl_insumos", (err, insumos) => {
      if (err) {
        res.json(err);
      } else {
        res.render("insumos/AgregarInsumo", { insumos });
      }
    })
  });
}
function registrar(req, res) {
  const data = req.body;
  //console.log(data)
  const RegistroInsumo = {
    nombreInsumo: data.nombreInsumo,
    medida: data.medidaInsumo,
    stock: data.stockInsumo,
    estado: data.estadoInsumo,
  };
  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO tbl_insumos SET ?",
      [RegistroInsumo],
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log("Insumo guardado");
        }
        res.redirect("/insumos");
      }
    );
  });
}
function editar(req, res) {
  const idInsumos = req.params.idInsumos;

  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM tbl_insumos WHERE idInsumos = ?', [idInsumos], (err, insumos) => {
      if (err) {
        res.json(err);
      }
      res.render('insumos/EditarInsumo', { insumos });
    });
  });
}
function actualizar(req, res) {
  const idInsumos = req.params.idInsumos;
  const data = req.body;

  console.log(data);

  req.getConnection((err, conn) => {
    if (err) {
      console.error('Error de conexión: ', err);
      return;
    }
    conn.query(
      'UPDATE tbl_insumos SET ? WHERE idInsumos = ?',
      [data, idInsumos],
      (err, rows) => {
        if (err) {
          console.error('Error al actualizar los datos: ', err);
          return;
        }
        
      }
    );
  });
}


function eliminar(req, res) {
  const idInsumos = req.body.idInsumos;

  req.getConnection((err, conn) => {
    conn.query('DELETE FROM tbl_insumos WHERE idInsumos = ?', [idInsumos], (err, rows) => {
      if (err) {
        console.error('Error al eliminar los datos: ', err);
        return;
      } else
        console.log("Se eliminaron los datos")
      res.redirect('/insumos');
    });
  })
}


module.exports = {
  listar: listar,
  crear: crear,
  registrar: registrar,
  editar: editar,
  actualizar: actualizar,
  eliminar: eliminar

}