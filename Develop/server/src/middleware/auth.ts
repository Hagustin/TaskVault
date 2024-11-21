import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import cors from 'cors';

// Rename your custom payload interface
interface CustomJwtPayload {
  id: string;
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Debug log to confirm JWT_SECRET_KEY
  console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);

  // Ensure JWT_SECRET_KEY is loaded correctly
  if (!process.env.JWT_SECRET_KEY) {
    console.error('JWT_SECRET_KEY is missing from environment variables');
    res.status(500).json({ message: 'Internal server error. JWT_SECRET_KEY not set.' });
    return;
  }

  // Check if the Authorization header exists
  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Debug log
  
  if (!authHeader) {
    console.error('Authorization header missing');
    res.status(401).json({ message: 'Authorization header missing' });
    return;
  }

  const token = authHeader.split(' ')[1]; // Extract token

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); // Handle missing token
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      res.status(403).json({ message: 'Forbidden' }); // Handle invalid token
      return;
    }

    const user = decoded as CustomJwtPayload; // Use renamed interface
    req.user = { id: user.id, username: user.username };
    console.log('Decoded User:', req.user); // Debug log
    next(); // Proceed to the next middleware
  });
};

// Set up CORS in the main server
const corsOptions = {
  origin: 'http://localhost:3000', // Allow frontend to make requests
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow headers like Authorization
};

export const setCors = cors(corsOptions); // You can export this to be used in the server setup
