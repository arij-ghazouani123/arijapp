import  express from 'express';
import { FindAllTesteur,AddRelease,DeleteRelease,FindAllRelease,FindSinglRelease,UpdateRelease, AddReleaseApk,getfile } from '../controllers/Release.controller.js';
const router = express.Router();
import multer from "multer";
//import path from "path";

// to save file in package /uploads/images
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "./uploads/images");
//     },
//     filename: (req, file, cb) => {
//         const newFileName = (+new Date()).toString() + path.extname(file.originalname);
//         cb(null, newFileName);
//     }
// })
//const upload = multer({ storage });
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });
  
  
  const upload = multer({ storage: storage });


/* add user */
//router.post('/release', upload.single("image"), AddRelease)
router.post('/release', upload.single('apkFile'), AddReleaseApk)
router.get('/download/:id', getfile)
/* find all users */
router.get('/release', FindAllRelease)
router.get('/releaseTesteur', FindAllTesteur)

/* find single user */
router.get('/release/:id', FindSinglRelease)

/* add user */
router.put('/release/release/:id', UpdateRelease)

/* add user */
router.delete('/release/:id', DeleteRelease)


// module.exports = router;
export default router;