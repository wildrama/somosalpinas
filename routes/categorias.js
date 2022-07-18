const express = require('express');
const router = express.Router();
const Producto = require('../models/producto');
const ModoLaser = require('../models/modoLaser')
const catchAsync =require('../utils/catchAsync');



// mostrar PRODUCTOS MODO LASER
router.get('/modo-laser', catchAsync( async (req, res) => {
    const modoLaserProductos = await ModoLaser.find({});
      res.render('modo-laser',{modoLaserProductos});
    }));
    
// MOSTRAR TODOS LOS PRODUCTOS CAJAS
router.get('/cajas', catchAsync( async (req, res) => {
    const productoCajas = await Producto.find({});
      res.render('cajas',{productoCajas});
    }))
        
// MOSTRAR CADA PRODUCTO CAJA


router.get('/cajas/ORIGAMI/ver-producto', catchAsync( async (req, res) => {
  // const idProducto = req.params.id;
  // const productoCajasIndividual = await Producto.findById(idProducto);
 const productoCajasIndividual = 199;
    res.render('productoIndividual',{productoCajasIndividual});
  }))

module.exports = router;