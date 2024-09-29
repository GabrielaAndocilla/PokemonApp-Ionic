import UserController from "@controllers/UserController";
import User from "@domains/entities/User";
import TokenRepositoryMySql from "@repositories/TokenRepositoryMySql";
import UserRepositoryMySql from "@repositories/UserRepositoryMySql";
import { LoginUser } from "@useCases/user/LoginUser";
import { RegisterUser } from "@useCases/user/RegisterUser";
import { LogoutUseCase } from "@useCases/user/LogoutUseCase";
import { Request, Response } from "express";
import jwt from 'jsonwebtoken';

jest.mock('jsonwebtoken');

jest.mock("@useCases/user/RegisterUser");
jest.mock("@useCases/user/LoginUser");
jest.mock("@useCases/user/LogoutUseCase");

jest.mock("../../db", () => ({
  query: jest.fn(),
}));

describe('Test User Controller',()=>{
  let req: Partial<Request>;
  let res: Partial<Response>;
  const user:User = {
    name:'userName',
    email:'emal@email.com',
    password:'password'
  }
  const mockToken = 'mocked.token';

  beforeAll(() => {
    (jwt.sign as jest.Mock).mockReturnValue(mockToken);
    (jwt.verify as jest.Mock).mockImplementation((token) => {
      if (token === mockToken) {
        return { userId: 1 };
      }
      throw new Error('Invalid token');
    });
  });

  it('should execute register',async () => {
    const mockExecute = jest.fn();
    (RegisterUser as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = { body: user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userRepo = {} as UserRepositoryMySql
    const tokenRepo = {} as TokenRepositoryMySql
    const controller = new UserController(userRepo,tokenRepo)
    await controller.register(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({message:"User register successfully",reqBody:user});
  })

  it('should execute login',async () => {
    const mockExecute = jest.fn().mockReturnValue(user);
    (LoginUser as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = { body: user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userRepo = {} as UserRepositoryMySql
    const tokenRepo = {} as TokenRepositoryMySql
    const controller = new UserController(userRepo,tokenRepo)
    await controller.login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    const userLogged = {name:user.name, email: user.email}
    expect(res.json).toHaveBeenCalledWith({token:mockToken,user:userLogged});
  })

  it('should refuse login',async () => {
    const mockExecute = jest.fn().mockReturnValue(undefined);
    (LoginUser as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = { body: user };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userRepo = {} as UserRepositoryMySql
    const tokenRepo = {} as TokenRepositoryMySql
    const controller = new UserController(userRepo,tokenRepo)
    await controller.login(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({error: 'Authentication failed'});
  })

  it('should execute logout',async () => {
    const mockExecute = jest.fn();
    (LogoutUseCase as jest.Mock).mockImplementation(() => ({
      execute: mockExecute,
    }));

    req = { body: user, headers:{authorization:`Bearer ${mockToken}`} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const userRepo = {} as UserRepositoryMySql
    const tokenRepo = {} as TokenRepositoryMySql
    const controller = new UserController(userRepo,tokenRepo)
    await controller.logOut(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(mockExecute).toHaveBeenCalledWith(mockToken)
    expect(res.json).toHaveBeenCalledWith({message: 'Successfully Logout'});
  })
})
