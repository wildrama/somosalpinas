const express = require('express');
const router = express.Router();
const catchAsync =require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const ModoLaser = require('../models/modoLaser');
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
    const user = req.user
    const productos = await Producto.find({}).populate('categoriaId');
    res.render('adm/mostrar',{productos,user});
    
  })) ;

// panel nuevo producto
  
  router.get('/nuevo-producto',isLoggedIn,catchAsync(async(req,res) =>{
    const categoriasAll = await Categoria.find({}).sort({nombre: 1});


    res.render('adm/crearProducto',{categoriasAll});
  }));
  // ENVIAR DATOS DEL FORMULARIO A LA BBDD
  
  router.post('/',isLoggedIn,  upload.array('imagenes'),catchAsync( async (req,res)=>{
console.log(req.body)
const productoBody = req.body
    const nuevoPRODUCTO = new Producto(productoBody);
    nuevoPRODUCTO.imagenes = req.files.map(f => ({ url: f.path, filename: f.filename }));
    await nuevoPRODUCTO.save();
    res.redirect(`/administrador/${nuevoPRODUCTO._id}`)
    } ));
  
   
// panel modo laser

    router.get('/agregar-modolaser',isLoggedIn,(req,res) =>{
      res.render('adm/agregarModoLaser');
    });
    

router.post('/agregar-modolaser',upload.array('imagenes'),isLoggedIn,catchAsync( async (req,res)=>{
     
      
    
        const nuevoPRODUCTOLaser = new ModoLaser(req.body);
        nuevoPRODUCTOLaser.imagenes = req.files.map(f => ({ url: f.path, filename: f.filename }));
        console.log(nuevoPRODUCTOLaser);
        console.log(req.files)

       await nuevoPRODUCTOLaser.save();
        res.redirect(`/administrador/mostrar-modolaser`)
    
      
      } ));

  router.get('/mostrar-modolaser',isLoggedIn,catchAsync(async(req,res) =>{

    const modoLaserProductos = await ModoLaser.find({});
    res.render('adm/mostrarModoLaser',{modoLaserProductos});
    
  
  }));


 
 
  router.get('/modo-laser/:id/editar',isLoggedIn,catchAsync( async (req,res) =>{
    const {id} = req.params;
    const productoModoLaser = await ModoLaser.findById(id);
    if (!productoModoLaser) {
      req.flash('error', 'No se puede encontrar el productoModoLaser');
      return res.redirect('/administrador');
  }
    res.render('adm/editModoLaser', {productoModoLaser})
  }));


  router.put('/modo-laser/:id',upload.array('imagenes'), isLoggedIn,catchAsync( async (req,res)=>{
    const {id} = req.params;
    console.log(req.body);
    const upModoLaser = await ModoLaser.findByIdAndUpdate(id, req.body);
      console.log(req.files)
      const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    upModoLaser.imagenes.push(...imgs);
    await upModoLaser.save();
    
    if (req.body.deleteImagenes) {
      for (let filename of req.body.deleteImagenes) {
          await cloudinary.uploader.destroy(filename);
      }
      await upModoLaser.updateOne({ $pull: { imagenes: { filename: { $in: req.body.deleteImagenes } } } })
  }
  
    req.flash('success', 'Publicación actualizada correctamente');
    res.redirect(`/administrador/mostrar-modolaser`)
    }))
     
   router.get('/modo-laser/:id/eliminar',isLoggedIn,catchAsync(async(req,res) =>{
const idML = req.params.id;
    const modoLaserProducto = await ModoLaser.findById(idML);
    res.render('adm/eliminarModoLaser',{modoLaserProducto});
    
  
  }));
    router.delete('/modo-laser/:id' ,isLoggedIn, catchAsync(async (req, res)=>{
      const {id}= req.params;
      const deleteProducto= await ModoLaser.findByIdAndDelete(id);
      req.flash('success', 'Publicación eliminada correctamente');
      res.redirect('/administrador');
    }))



  
  // RENDER STOCK INDIVIDUAL
  router.get('/:id', isLoggedIn,catchAsync(async (req, res) =>{
    const {id} = req.params;

   const producto = await Producto.findById(id).populate('categoriaId');
   res.render('adm/productoIndividualADM',{producto});
  } ))
  
  // ACTUALIZAR UN PRODUCTO DEL de la base de datos
      // poblate the products with the form and values
  router.get('/:id/editar',isLoggedIn,catchAsync( async (req,res) =>{
    const {id} = req.params;
    const categoriasAll1 = await Categoria.find({}).sort({nombre:1});
    const producto = await Producto.findById(id).pupulate('categoriaId');
    if (!producto) {
      req.flash('error', 'No se puede encontrar el producto');
      return res.redirect('/administrador');
  }
    res.render('adm/editarProducto', {producto,categoriasAll1})
  }));


     // poblate the products with the form and values
     router.get('/:id/editar-foto',isLoggedIn,catchAsync( async (req,res) =>{
        const {id} = req.params;
        const producto = await Producto.findById(id);
        if (!producto) {
          req.flash('error', 'No se puede encontrar el producto');
          return res.redirect('/administrador');
      }
        res.render('adm/editarProductoFoto', {producto})
      }));
    
    
  
  // ENVIAR PUT REQUEST
  // ,upload.array('imagenes')
  router.put('/editar-foto/:id',upload.array('imagenes'), isLoggedIn,catchAsync( async (req,res)=>{
    const {id} = req.params;
    const upProducto = await Producto.findByIdAndUpdate(id, req.body);
      console.log("upproducto"+ upProducto)
      const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    upProducto.imagenes.push(...imgs);
    console.log( imgs)

    await upProducto.save();
    console.log("req.body.deleteImagenes" +req.body.deleteImagenes);

    if (req.body.deleteImagenes) {
      for (let filename of req.body.deleteImagenes) {
          await cloudinary.uploader.destroy(filename);
      }
  }
  console.log( imgs)

  await upProducto.updateOne({ $pull: { imagenes: { filename: { $in: req.body.deleteImagenes } } } })

    req.flash('success', 'Publicación actualizada correctamente');
    res.redirect(`/administrador/${upProducto._id}`)
    }))
    
    

  
  // ENVIAR PUT REQUEST
  // ,upload.array('imagenes')
  router.put('/:id', isLoggedIn,catchAsync( async (req,res)=>{
  const {id} = req.params;
  const upProducto = await Producto.findByIdAndUpdate(id, req.body);
  console.log(upProducto);
    // const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  // upProducto.imagenes.push(...imgs);
  // if (req.body.deleteImagenes) {
  //   for (let filename of req.body.deleteImagenes) {
  //       await cloudinary.uploader.destroy(filename);
  //   }
// }
  req.flash('success', 'Publicación actualizada correctamente');
  res.redirect(`/administrador/${upProducto._id}`)
  }))
  
  

  
  // BORRAR STOCK INDIVIDUAL
  
  router.delete('/:id' ,isLoggedIn, catchAsync(async (req, res)=>{
    const {id}= req.params;
    const deleteProducto= await Producto.findByIdAndDelete(id);
    req.flash('success', 'Publicación eliminada correctamente');

    res.redirect('/administrador');
  }))

  module.exports = router;