import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import dotenv from 'dotenv';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerOptions from './docs/swaggerConfig.js';

const app = express();
dotenv.config();
mongoose.set('strictQuery', false);

const PORT = process.env.PORT||8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);

const urlMongoDB = process.env.URL_MONGO;


const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));



const conectarDB = async()=>{
    try {
        await mongoose.connect(urlMongoDB);
        console.log("Conectado a la base de datos");
    } catch (error) {
        console.log("Error al conectar a la base de datos", error);
        process.exit(1); 
    }
  
 };

conectarDB();

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

export default app;
