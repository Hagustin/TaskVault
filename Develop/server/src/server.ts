import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

// Mimic __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from client/dist
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

// API routes
app.use(express.json());
app.use(routes);

// Catch-all for React app
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
});

// Sync DB and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Unable to connect to the database:', err);
});
