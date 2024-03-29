const multer  = require('multer');
const path = require("path");

 function configMulter() {

   const storage = multer.diskStorage({
        destination: 'assets/images',
        filename: function(req, file ,cb) {
          cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
      });

      const multerStorage = multer({ storage: storage}).single('image');

      return {upload: multerStorage};
}
function configMulterMultiImages () {

  
  const storage = multer.diskStorage({
    destination: 'assets/images',
    filename: function(req, file ,cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
  });

  const multerStorage = multer({ storage: storage}).array("uploads[]", 100);

  return {upload: multerStorage};

}

module.exports = {

    configMulter,
    configMulterMultiImages,
}