import ITokenRepository from "@domains/repositories/ITokenRepository";
import IUserRepository from "@domains/repositories/IUserRepository";
import { ExtendReq } from "@middleware/authMiddleware";
import { LoginUser } from "@useCases/user/LoginUser";
import { LogoutUseCase } from "@useCases/user/LogoutUseCase";
import { RegisterUser } from "@useCases/user/RegisterUser";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

export default class UserController {
  private userRepository: IUserRepository;
  private tokenRepository: ITokenRepository;

  constructor(userRepository: IUserRepository, tokenRepository: ITokenRepository) {
    this.userRepository = userRepository;
    this.tokenRepository = tokenRepository;
  }

  register = async (req: Request, res: Response) => {
    try {
      const registerUser = new RegisterUser(this.userRepository);
      await registerUser.execute(req.body);
      return res.status(201).json({
        message: "User register successfully",
        reqBody: req.body
      });
    } catch (err) {
      console.error(err)
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const JWT_SECRET =  process.env.SECRET_KEY || '';
      const loginUser = new LoginUser(this.userRepository)
      const user = await loginUser.execute(req.body)
      if(!user) return res.status(401).json({ error: 'Authentication failed' });
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: '3h',
      });
      return res.status(200).json({ token, user: {name:user.name, email:user.email} });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  logOut = async (req: ExtendReq, res: Response) => {
    try {
      const token = req.headers['authorization']?.split(' ')[1];
      if (!token) {
          return res.status(400).json({ message: 'No token provided' });
      }
      const logout = new LogoutUseCase(this.tokenRepository)

      await logout.execute(token);

      return res.status(200).json({ message:'Successfully Logout' });
    } catch (err) {
      console.log('error logout', err)
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }


}
