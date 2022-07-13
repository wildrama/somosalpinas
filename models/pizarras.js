const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PizzarasFotoSchema = new Schema({
  
    url : String,
   filename: String
})
PizzarasFotoSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});
PizzarasFotoSchema.virtual('show').get(function() {
  return this.url.replace('/upload', '/upload/c_scale,h_400,w_600');
});
PizzarasFotoSchema.virtual('crop').get(function(){

  return this.url.replace('/upload', '/upload/c_scale,h_500,w_800');
});
const pizarrasSchema = new Schema({
    titulo : {
      type: String,
      required: true
    },

    categoria: {
      type: String,
      enum: ['Pizarra', 'Modo Laser','ABC','Memotest','Sellos','Dominos','De Yapa'],
      required : true
    },
    precio :{
      type:String,
    },
    imagenes:[ImagenSchema],

    descripcion:{
        type:String

    },
    etiquetas:[{
      type:String

  }],
 
  vecesPedido:{type:Number}
  },{timestamps:true})
  
  const Pizarras = mongoose.model('Pizarras', pizarrasSchema);

module.exports = Pizarras;
  
  