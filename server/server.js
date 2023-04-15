import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/route.js';
import multer from 'multer';
import sharp from 'sharp';
import __dirname from 'path';
import path from 'path';
import session from 'express-session';
import bodyParser from 'body-parser';
import cors from 'cors';


///arij 
import logger from 'morgan';
import cookieParser from'cookie-parser';

import routerrelease from './routes/Release.route.js';
//import passport from "passport";
// import { GridFsStorage } from 'multer-gridfs-storage';
// const multer = require('multer');



const app = express();

const port = process.env.port || 9090;
const databaseName ='buildLab';

app.use(
    cors({
        origin : '*'
    })
);
mongoose.set('debug', true);

mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`).then(() => {
    console.log(`connected to ${databaseName}`);
} ).catch(er => console.log(er));





///arij
if (process.env.NODE_ENV === "production") {
    console.log("app in production mode");
    app.use(express.static("client/build"));
    app.get("/*", function (req, res) {
        res.sendFile(
            path.join(__dirname, "client", "build", "index.html"),
            function (err) {
                if (err) res.status(500).send(err);
            }
        );
    });
}




app.use(bodyParser.urlencoded({extended: true}));

app.use(morgan("dev"))  //morgan

app.use(express.json());

app.use('/api', routerrelease)

app.use(express.urlencoded({encoded : true}));

app.use('/',userRouter);


app.use('/image', express.static('/public/images'));




//app.use(passport.initialize());
//app.use(passport.session())

//app.use(passport.initialize());
//app.use(passport.session());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static('' + path.join(__dirname, 'uploads')));


// app.use(express.static('' + path.join(__dirname, 'public')));




app.listen(port, () => {
    console.log(`Server running at http://hostname:${port}/`);

})


