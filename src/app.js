const express = require('express')
const hbs = require('hbs')
const app = express()
const { engine } = require('express-handlebars');
const myconnection = require('express-myconnection');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv').config();
const clientesRoutes = require('./routes/clientes');
const comprasRoutes = require('./routes/compras');
const insumosRoutes = require('./routes/insumos');
//const produccionRoutes = require('./routes/produccion');
const productosRoutes = require('./routes/productos');
const reparacionesRoutes = require('./routes/reparaciones');
const rolesRoutes = require('./routes/roles');
const ventasRoutes = require('./routes/ventas');
const port = process.env.PORT

//Especificar el directorio público
app.use(express.static('public'))
app.set('src',__dirname + '/src')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Motor de plantilla
hbs.registerPartials(__dirname + '/views/partials', function (err) { });
app.set('view engine', 'hbs')
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('views', __dirname + '/views')

app.use(myconnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: '', //Aquí se coloca el puerto del MySQL en el panel del xampp, si usas wampserver dejarlo vacio 
    database: 'crudnodejs'
}, 'single'));

app.use('/', clientesRoutes);
app.use('/', comprasRoutes);
app.use('/', insumosRoutes);
//app.use('/', produccionRoutes);
app.use('/', productosRoutes);
app.use('/', reparacionesRoutes);
app.use('/', rolesRoutes);
app.use('/', ventasRoutes);

app.get('/', (req, res) => {
    res.render('home', {
        nombre: 'home'
    })
})




app.get('/home', (req, res) => {
    res.render('home', {
        nombre: 'Home'
    })
})

app.get('/productos', (req, res) => {

    res.render('productos', {
        nombre: 'Productos'
    })
})

app.get('/ProduZapatos', (req, res) => {

    res.render('ProduZapatos', {
        nombre: 'ProduZapatos'
    })
})

app.get('/ProduBolsos', (req, res) => {

    res.render('ProduBolsos', {
        nombre: 'ProduBolsos'
    })
})

app.get('/ProduRino', (req, res) => {

    res.render('ProduRino', {
        nombre: 'ProduRino'
    })
})

app.get('/ProduMorral', (req, res) => {

    res.render('ProduMorral', {
        nombre: 'ProduMorral'
    })
})

app.get('/ProduBilletera', (req, res) => {

    res.render('ProduBilletera', {
        nombre: 'ProduBilletera'
    })
})

app.get('/ProduChaquetas', (req, res) => {

    res.render('ProduChaquetas', {
        nombre: 'ProduChaquetas'
    })
})

app.get('/ProduCorreas', (req, res) => {

    res.render('ProduCorreas', {
        nombre: 'ProduCorreas'
    })
})

app.get('/recomendaciones', (req, res) => {

    res.render('recomendaciones', {
        nombre: 'Recomendaciones'
    })
})

app.get('/sobre_nosotros', (req, res) => {

    res.render('sobre_nosotros', {
        nombre: 'sobre_nosotros'
    })
})

app.get('/contactanos', (req, res) => {

    res.render('contactanos', {
        nombre: 'contactanos'
    })
})

app.get('/dashboard', (req, res) => {
    res.render('dashboard', {
        nombre: 'Dashboard'
    })
})





//Login
app.get('/Login', (req, res) => {
    res.render('Login', {
        nombre: 'Login'
    })
})

app.get('/Registrarse', (req, res) => {
    res.render('Registrarse', {
        nombre: 'Registrarse'
    })
})

app.get('/Recuperar_clave', (req, res) => {
    res.render('Recuperar_clave', {
        nombre: 'Recuperar_clave'
    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        nombre: 'Página no encontrada'
    })
})


//verificar si el puerto esta escuchando
app.listen(port, () => {
    console.log(`Escuchando por el puerto ${port}`)
}) 