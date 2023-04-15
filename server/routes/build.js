import express from "express";
import multer from 'multer';
import path from 'path';
import { addBuild } from "../controllers/build.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split('.')[0];
    const extension = path.extname(file.originalname);
    cb(null, fileName + extension);
  }
});

const upload = multer({ storage: storage });

router.post('/addBuild', upload.single('app_apk'), addBuild);

export default router;
