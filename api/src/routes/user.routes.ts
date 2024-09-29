import { Router } from "express";

import UserController from "@controllers/UserController";
import AuthMiddleware from "@middleware/authMiddleware";
import TokenRepositoryMySql from "@repositories/TokenRepositoryMySql";
import UserRepositoryMySql from "@repositories/UserRepositoryMySql";

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
    this.router.post("/login", this.controller.login)
    this.router.post("/logout",AuthMiddleware.verifyToken, this.controller.logOut)

  }
}

export default new UserRoutes().router;
