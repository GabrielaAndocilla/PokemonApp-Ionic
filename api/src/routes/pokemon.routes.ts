import PokemonController from "@controllers/PokemonController";
import AuthMiddleware from "@middleware/authMiddleware";
import PokemonRepositoryMySql from "@repositories/PokemonRepositoryMySql";
import { Router } from "express";

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
    this.router.get("/:id",AuthMiddleware.verifyToken, this.controller.findById);
    this.router.put("/:id",AuthMiddleware.verifyToken, this.controller.update);
    this.router.patch("/favorite/:id",AuthMiddleware.verifyToken, this.controller.setAsFavorite);
    this.router.delete("/:id",AuthMiddleware.verifyToken, this.controller.delete);
  }
}

export default new PokemonRoutes().router;
