import { Router } from "express";

import UserController from "../infrastructure/controllers/UserController";
import AuthMiddleware from "../infrastructure/middlewares/authMiddleware";
import UserRepositoryMySql from "../infrastructure/repositories/UserRepositoryMySql";
import TokenRepositoryMySql from "../infrastructure/repositories/TokenRepositoryMySql";

class UserRoutes {
  router = Router()
  userRepository = new UserRepositoryMySql()
  tokenRepository = new TokenRepositoryMySql()
  controller = new UserController(this.userRepository, this.tokenRepository);

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.post('/register', this.controller.register)
    this.router.get("/login", this.controller.login)
    this.router.post("/logout",AuthMiddleware.verifyToken, this.controller.logOut)

  }
}

export default new UserRoutes().router;
