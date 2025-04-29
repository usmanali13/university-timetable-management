import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './db/index.js';

dotenv.config({ path: './.env' });

connectDB()
    .then(() => {
        server.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running on Port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((error) => {
        console.error('Error starting the server:', error); 
})