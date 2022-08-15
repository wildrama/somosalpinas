const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImagenSchemaCat = new Schema({
  
    url : String,
   filename: String
})
ImagenSchemaCat.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});
ImagenSchemaCat.virtual('show').get(function() {
  return this.url.replace('/upload', '/upload/c_crop,h_1080');
});
ImagenSchemaCat.virtual('crop').get(function(){
s
  return this.url.replace('/upload', '/upload/c_scale,h_400,w_600');
});
ImagenSchemaCat.virtual('carrusel').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_1080,w_1080');
});
const categoriaSchema = new Schema({
    nombre : {
      type: String,
      required: true
    },
    active:{
      type: String,
      enum: ['SI','NO'],
      required : true
    },
   
    imagenPortada:ImagenSchemaCat,

    
    etiquetas:[{
      type:String

  }],
 
  },{timestamps:true})
  
  const Categoria = mongoose.model('Categoria', categoriaSchema);

    module.exports = Categoria;
  
  