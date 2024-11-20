import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Rename your custom payload interface
interface CustomJwtPayload {
  id: string;
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Unauthorized' }); // Handle missing token
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err, decoded) => {
    if (err) {
      res.status(403).json({ message: 'Forbidden' }); // Handle invalid token
      return;
    }

    const user = decoded as CustomJwtPayload; // Use renamed interface
    req.user = { id: user.id, username: user.username };
    next(); // Proceed to the next middleware
  });
};
