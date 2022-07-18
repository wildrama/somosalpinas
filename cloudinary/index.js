const cloudinary = require('cloudinary').v2;

const { CloudinaryStorage } = require('multer-storage-cloudinary');


 
cloudinary.config({
  cloud_name:"",
  api_key:"",
  api_secret:"",

    // cloud_name:'wildrama',somosalpinas
    // api_key:'472512529558192',332294964619135
    // api_secret: 'eVoD_WdCtP2Ig6VMogXIxKdaHKM',691aEqCZzvOeQ2-wlMIcYzseGjg
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
    params: {
    folder: 'productos',
    allowedFormats: ['jpeg', 'png', 'jpg']
  },
});
 
 


module.exports = {
  cloudinary,
  storage
}