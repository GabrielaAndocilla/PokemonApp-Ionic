import { Router } from "express";
import PokemonController from "../controllers/PokemonController";

class PokemonRoutes {
  router = Router()
  controller = new PokemonController()

  constructor(){
    this.initializedRoutes()
  }

  initializedRoutes(){
    this.router.post('/', this.controller.create)
    this.router.get("/", this.controller.findAll);
    this.router.get("/:id", this.controller.findById);


  }
}

export default new PokemonRoutes().router;
