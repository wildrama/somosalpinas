const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Categoria = require('./categoria');

const ImagenSchema = new Schema({
  
    url : String,
   filename: String
})
ImagenSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});
ImagenSchema.virtual('show').get(function() {
  return this.url.replace('/upload', '/upload/c_scale,w_800');
});
ImagenSchema.virtual('crop').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_400,w_600');
});
ImagenSchema.virtual('carrusel').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_1080,w_1080');
});
const productoSchema = new Schema({
    titulo : {
      type: String,
      required: true
    },
    

    categoriaId:{
      type: Schema.Types.ObjectId,
      ref:'Categoria',
      required : true
    },
    precio :{
      type:String,
    },
    imagenes:[ImagenSchema],
    imagenDePortadaProducto:[{
       url : String,
    filename: String,
    }],
    caracteristicas:{
        type:String

    },
    incluye:{
      type:String
    },
    medidas:{
      type: String
    }
    ,
    etiquetas:[{
      type:String

  }],
  cantidadStock:{
    type:Number
  }
  ,
  vecesPedido:{
    type:Number
  }
  },{timestamps:true})
  
  const Producto = mongoose.model('Producto', productoSchema);

    module.exports = Producto;
  
  