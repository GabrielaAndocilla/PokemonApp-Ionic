import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import Routes from "./routes";

export default class Server {
  constructor(app: Application, port:string) {
    this.config(app, port);
    new Routes(app);
  }

  private config(app: Application, port: string): void {
    console.log('configurating')
    const corsOptions: CorsOptions = {
      origin: `http://localhost:${port}`
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
