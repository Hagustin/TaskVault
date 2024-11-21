import * as dotenv from 'dotenv';
import cors from 'cors';  // Add the cors package for handling cross-origin requests
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Check if JWT_SECRET_KEY is loaded correctly
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

// Setup CORS to allow requests from frontend (adjust origin as needed)
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Allow only frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allow headers like Authorization
};

app.use(cors(corsOptions));  // Apply CORS middleware

// Serves static files from the frontend's dist folder
app.use(express.static('../client/dist'));

// Enable JSON parsing for incoming requests
app.use(express.json());

// Use the routes defined in routes/index.js
app.use(routes);

// Sync with the database (force: true drops tables on every start)
sequelize.sync({ force: false }).then(() => {  // Change force to false in production
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
