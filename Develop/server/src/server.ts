const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the client's dist folder
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// Middleware
app.use(express.json());

// API Routes
app.use(routes);

// Catch-all route for React frontend
app.get('*', (_, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// Sync database and start server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
  process.exit(1); // Exit process if unable to connect to the database
});
