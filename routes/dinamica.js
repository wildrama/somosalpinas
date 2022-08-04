const express = require('express');
const router = express.Router();
const catchAsync =require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const Categoria= require('../models/categoria');
const {storage} = require('../cloudinary/index');
const {cloudinary} = require('../cloudinary/index');


const multer = require('multer');
const upload = multer({storage});
  

// CRUD ADMINNN
// router.get('/inicio', catchAsync(async(req,res)=>{
// const user = new Usuario({email:'rambo1bc@hotmail.com',username: 'scorcelli',password:'123456'})
//   const nuevoUsuario= await User.register(user,'123456')
//   res.send(nuevoUsuario);
// })) 

// RENDER VER mostrar elementos Inicio de CRUD ADMIN
router.get('/', isLoggedIn,catchAsync(async (req, res) => {
    try{
      const categorias = await Categoria.find();
      console.log(categorias)
  
      res.render('adm/verTodasLasCategorias',{categorias});
    }catch(error){
      console.log(error)
      req.flash('error', 'No se pudo encontrar ninguna categoría. Intente nuevamente')
      res.redirect('/administrador');
    }
   
    
  })) ;

  router.get('/nueva-categoria', isLoggedIn,catchAsync(async (req, res) => {

    res.render('adm/crearCategoria');

  })) ;

  router.post('/nueva-categoria', upload.single('imagen'), isLoggedIn,catchAsync(async (req, res) => {
   const nuevaCatBody = {
    nombre: req.body.nombre,
    active: 'SI',
   }
   console.log(req.file)

    const nuevaCategoria = new Categoria(nuevaCatBody);
    nuevaCategoria.imagenPortada = {
      url:req.file.path,
      filename:req.file.filename
    }
    await nuevaCategoria.save();
    console.log(nuevaCategoria)

    req.flash('success', `Se creo la categoria ${nuevaCategoria.nombre} correctamente`);
    res.redirect(`/administrador/adm-categorias`);

  })) ;



  router.post('/nueva-categoria/actualizar-portada', upload.single('imagen'), isLoggedIn,catchAsync(async (req, res) => {
    const nuevaCatBody = {
     nombre: req.body.nombre,
     active: 'SI',
    }
 
     const nuevaCategoria = new Categoria(nuevaCatBody);
     nuevaCategoria.imagenPortada = {
       url:req.file.path,
       filename:req.file.filename
     }
     await nuevaCategoria.save();
     console.log(nuevaCategoria)
 
     req.flash('success', `Se creo la categoria ${nuevaCategoria.nombre} correctamente`);
     res.redirect(`/administrador/adm-categorias`);
 
   })) ;














    module.exports = router;