import { Router } from "express";
import PokemonController from "../infrastructure/controllers/PokemonController";
import AuthMiddleware from "../infrastructure/middlewares/authMiddleware";
import PokemonRepositoryMySql from "../infrastructure/repositories/PokemonRepositoryMySql";
import TokenRepositoryMySql from "../infrastructure/repositories/TokenRepositoryMySql";

class PokemonRoutes {
  router = Router()
  repository = new PokemonRepositoryMySql()
  controller = new PokemonController(this.repository);

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.post('/', AuthMiddleware.verifyToken,this.controller.create)
    this.router.get("/", AuthMiddleware.verifyToken,this.controller.findAll);
    this.router.get("/:id", this.controller.findById);


  }
}

export default new PokemonRoutes().router;
