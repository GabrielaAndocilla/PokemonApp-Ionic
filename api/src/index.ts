import dotenv from "dotenv";
import express, { Application } from "express";
import Server from "./server";
dotenv.config();

const app: Application = express();
const port = process.env.PORT || '8081';
const server: Server = new Server(app, port);
const PORT = parseInt(port)

app
  .listen(PORT, "localhost", function () {
    console.log(`Server is running on port ${PORT}.`);
  })
  .on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.log("Error: address already in use");
    } else {
      console.log(err);
    }
  });
