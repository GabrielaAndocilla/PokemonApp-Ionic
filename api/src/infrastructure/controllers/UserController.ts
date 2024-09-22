import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { LoginUser } from "../../application/use_cases/user/LoginUser";
import { LogoutUseCase } from "../../application/use_cases/user/LogoutUseCase";
import { RegisterUser } from "../../application/use_cases/user/RegisterUser";
import ITokenRepository from "../../domain/repositories/ITokenRepository";
import IUserRepository from "../../domain/repositories/IUserRepository";
import { ExtendReq } from "../middlewares/authMiddleware";


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
      expiresIn: '1h',
      });
      return res.status(200).json({ token });
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
