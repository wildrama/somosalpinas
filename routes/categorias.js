const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const ModoLaser = require('../models/modoLaser')
const catchAsync =require('../utils/catchAsync');




// mostrar PRODUCTOS MODO LASER
router.get('/modo-laser', catchAsync( async (req, res) => {
  try {
    const modoLaserProductos = await ModoLaser.find({});
    console.log('MODOLASERGET');
    res.render('modo-laser',{modoLaserProductos});
  } catch (error) {
    console.log(error)
  }

    }));

// MOSTRAR TODOS LOS PRODUCTOS CAJAS
router.get('/cajas', catchAsync( async (req, res) => {
  try {
    const productos = await Producto.find({categoria:'Cajas'});
    res.render('cajas',{productos});
  } catch (error) {
    console.log(error)
  }
    
    }))
        


   


   // MOSTRAR TODOS LOS PRODUCTOS DUO
router.get('/DUO', catchAsync( async (req, res) => {
  try {
    const productos = await Producto.find({categoria:'DUO'});
    res.render('duo',{productos});
  } catch (error) {
    console.log(error)
  }
    
    }))
 
    // MOSTRAR TODOS LOS PRODUCTOS ABC
router.get('/ABC', catchAsync( async (req, res) => {
  try {
    const productos = await Producto.find({categoria:'ABC'});
    res.render('abc',{productos});
  } catch (error) {
    console.log(error)
  }
    
    })) 
    
    // MOSTRAR TODOS LOS PRODUCTOS Domino
    router.get('/domino', catchAsync( async (req, res) => {
      try {
        const productos = await Producto.find({categoria:'Domino'});
        res.render('domino',{productos});
      } catch (error) {
        console.log(error)
      }
        
        })) 
  
      // MOSTRAR TODOS LOS PRODUCTOS pizarras
      router.get('/pizarras', catchAsync( async (req, res) => {
        try {
          const productos = await Producto.find({categoria:'Pizarras'});
          res.render('pizarras',{productos});
        } catch (error) {
          console.log(error)
        }
          
          }))  
           
    
    
    
  

  
        // MOSTRAR TODOS LOS PRODUCTOS Mapas
  router.get('/mapas', catchAsync( async (req, res) => {
    try {
      const productos = await Producto.find({categoria:'Mapas'});
      res.render('cajas',{productos});
    } catch (error) {
      console.log(error)
    }
      
      }))  

              // MOSTRAR TODOS LOS PRODUCTOS Memotest
  router.get('/memotest', catchAsync( async (req, res) => {
    try {
      const productos = await Producto.find({categoria:'Memotest'});
      res.render('cajas',{productos});
    } catch (error) {
      console.log(error)
    }
      
      }))  


   // MOSTRAR TODOS LOS PRODUCTOS Sellos
   router.get('/sellos', catchAsync( async (req, res) => {
     try {
       const productos = await Producto.find({categoria:'Sellos'});
       res.render('sellos',{productos});
     } catch (error) {
       console.log(error)
     }
       
       }))  
       

// MOSTRAR CADA PRODUCTO ABC
router.get('/cajas/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualCaja',{producto});
  }))


  // MOSTRAR CADA PRODUCTO DOMINO
router.get('/domino/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualDomino',{producto});
  }))
    

  
  // MOSTRAR CADA PRODUCTO DUO
router.get('/DUO/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualDUO',{producto});
  }))


   // MOSTRAR CADA PRODUCTO MAPAS
router.get('/mapas/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualMapas',{producto});
  }))
   // MOSTRAR CADA PRODUCTO memotest
router.get('/memotest/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualMemotest',{producto});
  })) 
 // MOSTRAR CADA PRODUCTO pizarras
router.get('/pizarras/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualPizarras',{producto});
  }))  
   // MOSTRAR CADA PRODUCTO pizarras
router.get('/Sellos/:id/ver-producto', catchAsync( async (req, res) => {
  const idProducto = req.params.id;
  const producto = await Producto.findById(idProducto);
    res.render('productoIndividualSellos',{producto});
  })) 


module.exports = router;