import { Application } from "express";
import pokemonRoutes from "./pokemon.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/pokemons", pokemonRoutes);
  }
}
