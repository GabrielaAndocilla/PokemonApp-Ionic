import { Application } from "express";
import pokemonRoutes from "./pokemon.routes";
import userRoutes from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/pokemons", pokemonRoutes);
    app.use("/api", userRoutes);

  }
}
