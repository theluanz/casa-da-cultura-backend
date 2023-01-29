import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface IJwtInfo {
  id: string;
  iat: number;
  exp: number;
}


const authMiddleware = (request: Request, response: Response, next: NextFunction) => {
  // Get the token from the headers
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ message: 'Invalid token' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as IJwtInfo;
    console.log(decoded)
    request.userId = decoded.id;
    console.log(request.userId);
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Invalid token' });
  }
};

export { authMiddleware };
