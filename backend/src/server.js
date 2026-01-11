import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import path from 'path';
import { connectDB } from './lib/db.js';
import { ENV } from './lib/env.js';
import cors from "cors";


const app = express();

const __dirname = path.resolve();

const PORT = ENV.PORT || 3000;

// Increase JSON body size limit to handle base64-encoded profile images
app.use(
  express.json({
    limit: "10mb",
  })
); // req.body

// Ensure CLIENT_URL includes protocol for CORS
const clientOrigin = ENV.CLIENT_URL;
const corsOrigin = clientOrigin.startsWith('http') ? clientOrigin : `http://${clientOrigin}`;

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(cookieParser()); // req.cookies

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (ENV.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => 
        res.sendFile(path.join(__dirname, '../frontend', 'dist', 'index.html')));
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});