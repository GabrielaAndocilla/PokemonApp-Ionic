import cors, { CorsOptions } from "cors";
import express, { Application } from "express";
import Routes from "./routes";

export default class Server {
  constructor(app: Application, port:string) {
    this.config(app, port);
    new Routes(app);
  }

  private config(app: Application, port: string): void {
    const corsOptions: CorsOptions = {
      origin: [`http://localhost:${port}`,'http://localhost:8100','http://127.0.0.1:5173']
    };

    app.use(cors(corsOptions));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  }
}
