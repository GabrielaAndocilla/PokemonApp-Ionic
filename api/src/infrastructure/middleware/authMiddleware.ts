import ITokenRepository from '@domains/repositories/ITokenRepository';
import TokenRepositoryMySql from '@repositories/TokenRepositoryMySql';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export interface ExtendReq extends Request {
  user?: any;
}

class AuthMiddleware {

  constructor(private tokenRepository: ITokenRepository) {}

verifyToken = async (req: ExtendReq, res: Response, next: NextFunction) => {
  const JWT_SECRET =  process.env.SECRET_KEY || '';

  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }
  const {status,message} = await this.tokenRepository.isTokenInvalidated(token);
  if(status !== 200) res.status(status).json({message})
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized!' });
    }

    req.user = decoded;
    next();
  });
};

}

export default new AuthMiddleware(new TokenRepositoryMySql())
