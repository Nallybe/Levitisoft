const bcrypt = require('bcrypt');

function login(req, res) {
  if (req.session.loggedin != true) {
    res.redirect('login');
  } else {
    res.redirect('dashboard');
  }
}

function auth(req, res) {
  const data = req.body;
  console.log(data)
  req.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
    }

    conn.query(
      'SELECT * FROM users_access WHERE correo = ?',
      [data.correol],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }

        if (results.length > 0) {
          const user = results[0];

          bcrypt.compare(data.passswordl, user.passsword, (err, isMatch) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Error al comparar contraseñas' });
            }

            if (isMatch) {
              req.session.loggedin = true;

              // Obtener el nombre correspondiente al correo electrónico en users_info
              conn.query(
                'SELECT nombre FROM users_info WHERE idAccess = ?',
                [user.idAccess],
                (error, infoResults) => {
                  if (error) {
                    console.log(error);
                    return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
                  }

                  if (infoResults.length > 0) {
                    req.session.name = infoResults[0].nombre;
                    res.redirect('/dashboard');
                  }



                }
              );
            } else {
              res.render('login', { errorl: 'Error, contraseña incorrecta' });
              // Aquí puedes redirigir al usuario a otra página o enviar una respuesta de éxito
              // res.redirect('/dashboard');
            }
          });
        } else {
          res.render('login', { errorl: 'Error, el correo no existe' });
        }
      }
    );
  });
}



function crear(req, res) {
  if (req.session.loggedin != true) {
    req.getConnection((err, conn) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
      }

      conn.query("SELECT * FROM users_access", (err, users) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }

        conn.query("SELECT * FROM tbl_roles", (err, roles) => {
          if (err) {
            console.log(err);
            return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
          }

          res.render("login", { users, roles });
        });
      });
    });

  } else {
    res.redirect('dashboard');
  }

}

function registrar(req, res) {
  const data = req.body;
  console.log(data)
  req.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
    }

    conn.query(
      'SELECT * FROM users_access WHERE correo = ?',
      [data.correo],
      (error, results) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
        }

        if (results.length > 0) {
          conn.query("SELECT * FROM tbl_roles", (err, roles) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Error en la consulta a la base de datos' });
            }

            return res.render('login', { error: 'Error, el correo ya existe', roles });
          });
        } else {
          const salt = 10;
          bcrypt.hash(data.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
              return res.status(500).json({ error: 'Error en la encriptación de la contraseña' });
            }

            const registroUsuario = {
              idRoles: data.rol,
              correo: data.correo,
              passsword: hash,
              estado: 'A'
            };

            conn.query(
              'INSERT INTO users_access SET ?',
              registroUsuario,
              (error, result) => {
                if (error) {
                  console.log(error);
                  return res.status(500).json({ error: 'Error en la inserción en la base de datos' });
                }

                console.log('Información del usuario guardada');
                req.session.loggedin = true; // Establece la sesión como iniciada
                req
                const idAccess = result.insertId; // Obtiene el idAccess generado

                return res.redirect('/registro/' + idAccess);

              }
            );
          });

        }
      }
    );
  });
}

function registro(req, res) {
  const idAccess = req.params.idAccess;
  res.render('registro', { idAccess: idAccess });
}

function registroinfo(req, res) {
  const idAccess = req.params.idAccess;
  const data = req.body;

  const RegistroInfoUser = {
    idAccess: idAccess,
    documento: data.documento,
    nombre: data.nombre,
    telefono: data.telefono,
    estado: 'A',
  };
  //console.log(RegistroInfoUser)
  req.getConnection((err, conn) => {
    conn.query(
      "INSERT INTO users_info SET ?",
      [RegistroInfoUser],
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log("Información del usuario guardado");
          req.session.loggedin = true;
          req.session.name = data.nombre;
          //console.log(req.session.name)
          const nameQueryParam = encodeURIComponent(req.session.name);
          //console.log(nameQueryParam)
          res.redirect("/dashboard?name=" + nameQueryParam);

        }

      }
    );
  });
}

function logout(req, res) {
  if (req.session.loggedin == true) {
    req.session.destroy();
  }
  res.redirect('/home');
}

function olvido(req,res){
  res.render('olvidar_contrase')
}

module.exports = {
  login,
  crear,
  registrar,
  auth,
  registro,
  registroinfo,
  logout, 
  olvido
};
