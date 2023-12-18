const express=require('express');
const router=express.Router();
// const multer = require('multer');
const fs=require('fs');
// const upload = multer({ storage: multer.memoryStorage() });
// const multer = require("multer");

// const storage=multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadDir = './uploads';
//         if (!fs.existsSync(uploadDir)) {
//             fs.mkdirSync(uploadDir);
//           }
//           return cb(null, uploadDir);
//       },
//       filename: function (req, file, cb) {
//         return cb(null,`${Date.now()}-${file.originalname}`);
//       }
// })
// const upload = multer({  storage});
const {certificateGen}=require("../controllers/certificateGen")
const{uploadFiles}=require("../controllers/uploadFiles");

router.post("/uploadfile", uploadFiles);
// router.get("/certigen",certificateGen)
module.exports=router;





