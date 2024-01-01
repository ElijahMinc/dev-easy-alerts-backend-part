//dotenv configurationServer
import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'
import configRouter from './routes/index'
import errorHandler from './middlewares/error.middleware';
import SocketController from './controllers/SocketController/SocketController';
import { tokenService } from './services/TokenService';
import crypto from 'crypto'


export const expressApp = express();
const socketApp = new SocketController(expressApp)

const CONNECT_DB = process.env.MONGODB_CONNECT_DB_URL.replace('<password>', process.env.MONGODB_CONNECT_DB_PASSWORD);

const whitelist = ['http://localhost:3000']


expressApp.use(cors({
   credentials: true,
   methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
   origin: 'http://localhost:3000'
}));

// expressApp.use(cors({
//    // origin: 'http://localhost:3000'
//    // credentials: true,
//    // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'],
//    // origin: function (origin, callback) {
//    //    console.log('origin', origin)
//    //    callback(null, true)
//    //    // if (whitelist.indexOf(origin) !== -1) {
         
//    //    //   callback(null, true)
//    //    // } else {
//    //    //    console.log(origin, 'no')


//    //    //   callback(new Error('Not allowed by CORS'))
//    //    // }
//    //  }
// }));

expressApp.use(express.json());
//routers
expressApp.use('/api', configRouter)
//error all handling
expressApp.use(errorHandler)


const startApp = async () => {
   try {

       mongoose.set({
            strictQuery: true
      })
      await mongoose.connect(CONNECT_DB);


      socketApp.server.listen(process.env.PORT || 9000, () => {  
         console.log(`⚡️[server]: Server is running at http://localhost:${process.env.PORT || 9000}`);
       });
   } catch (e) {
      console.error('Something went wrong during connection MongoDB with error', e)
   }
}

startApp()