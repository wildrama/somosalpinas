const express = require('express');
const router = express.Router();
const catchAsync =require('../utils/catchAsync');
const {isLoggedIn} = require('../middleware');
const Producto = require('../models/producto');
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
    res.render('adm/mostrar',{user});
    
  })) ;
  // router.post('/pruebapost', isLoggedIn,catchAsync(async (req, res) => {
   
 
    
  // })) ;
  // RENDER agregar elemento
  
  router.get('/nuevo-producto',isLoggedIn,(req,res) =>{
    res.render('adm/crearProducto');
  });

  // ENVIAR DATOS DEL FORMULARIO A LA BBDD
  //
  router.post('/',upload.array('imagenes'),isLoggedIn,catchAsync( async (req,res)=>{
console.log(req.body)
    const nuevoPRODUCTO = new Producto(req.body);
    nuevoPRODUCTO.imagenes = req.files.map(f => ({ url: f.path, filename: f.filename }));
console.log(nuevoPRODUCTO);
console.log(req.files)
    await nuevoPRODUCTO.save();
    res.redirect(`/administrador/${nuevoPRODUCTO._id}`)

    } ));




router.get('/agregar-modolaser',isLoggedIn,(req,res) =>{
      res.render('adm/agregarModoLaser');
    });
    

router.post('/agregar-modolaser',upload.array('imagenes'),isLoggedIn,catchAsync( async (req,res)=>{
     
      
    
        const nuevoPRODUCTOLaser = new ModoLaser(req.body);
        nuevoPRODUCTOLaser.imagenes = req.files.map(f => ({ url: f.path, filename: f.filename }));
        console.log(nuevoPRODUCTOLaser);
        console.log(req.files)
    
       await nuevoPRODUCTOLaser.save();
        res.redirect(`/administrador/modo-laser-producto${nuevoPRODUCTOLaser._id}`)
    
        } ));
  // ACTUALIZAR UN PRODUCTO DEL de la base de datos
      // poblate the products with the form and values
  router.get('/:id/editar',isLoggedIn,catchAsync( async (req,res) =>{
    const {id} = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
      req.flash('error', 'No se puede encontrar la publicación');
      return res.redirect('/administrador');
  }
    res.render('adm/editarproducto', {producto})
  }));
  
  // ENVIAR PUT REQUEST
  // editar producto
  router.put('/:id',upload.array('imagenes'), isLoggedIn,catchAsync( async (req,res)=>{
  const {id} = req.params;
  console.log(req.body);
  const upProducto = await Propiedad.findByIdAndUpdate(id, req.body);
    console.log(req.files)
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
  upProducto.imagenes.push(...imgs);
  await upProducto.save();

  if (req.body.deleteImagenes) {
    for (let filename of req.body.deleteImagenes) {
        await cloudinary.uploader.destroy(filename);
    }
    await upProducto.updateOne({ $pull: { imagenes: { filename: { $in: req.body.deleteImagenes } } } })
}

  req.flash('success', 'Publicación actualizada correctamente');
  res.redirect(`/administrador/${upProducto._id}`)
  }))
  
  // editar modolaser
  
  // RENDER STOCK INDIVIDUAL
  router.get('/:id', isLoggedIn,catchAsync(async (req, res) =>{
    const {id} = req.params;

   const producto = await Producto.findById(id)
   res.render('adm/productoIndividualADM',{producto});
  } ))
  
  
  // BORRAR STOCK INDIVIDUAL
  
  router.delete('/:id' ,isLoggedIn, catchAsync(async (req, res)=>{
    const {id}= req.params;
    const deleteProducto= await Propiedad.findByIdAndDelete(id);
    res.redirect('/administrador');
  }))

  module.exports = router;