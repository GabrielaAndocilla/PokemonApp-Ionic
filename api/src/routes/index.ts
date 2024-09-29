import { Application } from "express";
import pokemonRoutes from "./pokemon.routes";
import userRoutes from "./user.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api/pokemon", pokemonRoutes);
    app.use("/api", userRoutes);

  }
}
