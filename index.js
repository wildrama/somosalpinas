// app alpinas
const express = require('express');
const app = express();

const port = 3041;
const path = require('path');
const methodOverride = require('method-override')
const flash = require('connect-flash');
const ejsMate = require('ejs-mate');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const multer = require('multer');


const mongoose = require('mongoose');
// require mongoose models
const Propiedad = require('./models/propiedad.js');
const Usuario = require('./models/usuario.js');
// utils
const catchAsync =require('./utils/catchAsync');
const ExpressError=require('./utils/ExpressError');


// session
const session =  require('express-session')

const sessionConfig = {
  secret: 'rb78br87',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
// routes

const admRoutes =require('./routes/administrador');
const userUiRoutes= require('./routes/propiedades')
const rutasUsuario = require('./routes/usuario')
const categoriasRoutes = require('./routes/categorias')
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/SomosAlpinasDataBase',{
    useNewUrlParser :true,
    useUnifiedTopology:true,
  });
  console.log("everything abot db is OK")
}



// statics files
app.use(express.static('public'));
app.use(express.static('files'));

// views and methodOverride
// app.engine('ejs', ejsMate)
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


// sessionMiddleware
app.use(session(sessionConfig)); 

//  flash middleware  


// app.use((req, res, next) => {
//   console.log(req.session)
//   res.locals.currentUser = req.user;
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// })



// passport

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Usuario.authenticate()));

passport.serializeUser(Usuario.serializeUser());
passport.deserializeUser(Usuario.deserializeUser());



app.use((req, res, next) => {
  console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})


// Routes for admin
app.use('/administrador',admRoutes);
app.use('/', rutasUsuario )
app.use('/categorias',categoriasRoutes);


// // routes for regular user
// app.use('/categorias',categoriasRoutes);

// app.use('/categorias/modo-laser',modoLaserRoutes);
// app.use('/categorias/pizarras',pizarrasRoutes);
// app.use('/categorias/ABC',modoLaserRoutes);
// app.use('/categorias/memotest',modoLaserRoutes);
// app.use('/categorias/sellos',modoLaserRoutes);
// app.use('/categorias/domino',modoLaserRoutes);
// app.use('/categorias/deYapa',modoLaserRoutes);


// RENDER HOME
app.get('/', (req, res) => {
  res.render('inicio');
})


// error midller ware base
app.all('*', (req, res, next) => {
  next(new ExpressError('Esta pagina no existe. Vulve al Inicio', 404))
})



app.use(function (err, req, res, next) {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'Algo salio mal!'
  res.status(statusCode).render('errors', { err })
}); 


// endAPP
app.listen(port, () => console.log(`SomosAlpinas ${port}!`))

