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

  router.get('/:id/actualizar', isLoggedIn,catchAsync(async (req, res) => {
    try{
      const categoriaId = req.params.id;
      const categoria = await Categoria.findById(categoriaId);
      res.render('adm/editarCategoria',{categoria});
    }catch(error){
      req.flash('error','No se puede encontrar la categoría');
      res.redirect('/administrador')
    }


  })) ;

  router.post('/:id/nueva-portada', upload.single('imagen'), isLoggedIn,catchAsync(async (req, res) => {
  try{
    const categoriaId = req.params.id;

     const categoriaEncontrada = await Categoria.findById(categoriaId);
     categoriaEncontrada.imagenPortada = {
       url:req.file.path,
       filename:req.file.filename
     }
     await categoriaEncontrada.save();
     console.log(categoriaEncontrada)
 
     req.flash('success', `Se actualizo la portada de ${categoriaEncontrada.nombre} correctamente`);
     res.redirect(`/administrador/adm-categorias`);
  }catch(error){
    req.flash('error', `No se pudo actualizar la portada correctamente`);

    res.redirect(`/administrador/adm-categorias`);

  }

 
   })) ;

   router.post('/:id/nuevo-nombre',catchAsync(async (req, res) => {
    try{
      const categoriaId = req.params.id;

   
       const categoriaActualizada = await Categoria.findById(categoriaId);
       categoriaActualizada.nombre= req.body.nombre;
       if(req.body.active == 'SI'){
        categoriaActualizada.active = 'SI'
       }
       if(req.body.active =='NO'){
        categoriaActualizada.active = 'NO'

       }
       await categoriaActualizada.save()
       console.log(categoriaActualizada)

       res.send(categoriaActualizada);
    }catch(error){
res.send('error')
    }
    
 
   })) ;

   router.post('/:id/mostrar',catchAsync(async (req, res) => {
    try{
      const categoriaId = req.params.id;

   
       const categoriaActualizada = await Categoria.findById(categoriaId);
       categoriaActualizada.active= req.body.active;

       await categoriaActualizada.save()
       console.log(categoriaActualizada)

       res.send(categoriaActualizada);
    }catch(error){
res.send('error')
    }
    
 
   })) ;










    module.exports = router;