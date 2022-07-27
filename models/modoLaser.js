const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ImagenSchemaML = new Schema({
  
    url : String,
   filename: String
})
ImagenSchemaML.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});
ImagenSchemaML.virtual('show').get(function() {
  return this.url.replace('/upload', '/upload/c_scale,w_600');
});
ImagenSchemaML.virtual('crop').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_500,w_800');
});
ImagenSchemaML.virtual('carrusel').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_1080,w_1080');
});
const modolaserSchema = new Schema({
    titulo : {
      type: String,
      required: true
    },
        
    
    imagenes:[ImagenSchemaML],

  
    tags:[{
        type:String
    }]
  
  })
  
  const ModoLaser = mongoose.model('ModoLaser', modolaserSchema);

module.exports = ModoLaser;
  
  