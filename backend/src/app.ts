import express from 'express';
import authRoutes from './routes/auth.js';
import jobRoutes from './routes/job.js';
import userRoutes from './routes/user.js';
import paymentRoutes from './routes/payment.js';
import utilsRoutes from './routes/utilsRoute.js';
import ApiError from './utils/ApiError.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true, methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/utils', utilsRoutes);
app.use('/api', jobRoutes);


app.use((err:ApiError,req:express.Request,res:express.Response,next:express.NextFunction)=>{
    return res.status(err.statusCode || 500).json({message:err.message})
})
export default app;