import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
   destination: function(req,file,cb){
        cb(null,'uploads/');//Destination folder where the uploaded images will be stored
    },
    filename: function (req, file, cb){
        cb(null,Date.now()+path.extname(file.originalname));//Generating a unique filename
    }
});
const uploadMiddleware = multer({storage: storage})

export default uploadMiddleware;