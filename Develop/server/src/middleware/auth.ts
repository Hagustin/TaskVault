import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Rename your custom payload interface
interface CustomJwtPayload {
  id: string;
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  // Debug log to confirm JWT_SECRET_KEY
  console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
  

  const authHeader = req.headers['authorization'];
  console.log('Authorization Header:', authHeader); // Debug log
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); // Handle missing token
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY as string, (err, decoded) => {
    if (err) {
      console.error('JWT Verification Error:', err.message);
      console.log('JWT verification failed:', err); // Debug log
      console.log('Token:', token); // Debug log
      res.status(403).json({ message: 'Forbidden' }); // Handle invalid token
      return;
    }

    const user = decoded as CustomJwtPayload; // Use renamed interface
    req.user = { id: user.id, username: user.username };
    console.log('Decoded User:', req.user); // Debug log
    next(); // Proceed to the next middleware
  });
};
