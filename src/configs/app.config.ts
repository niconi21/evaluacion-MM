import express from "express";
import { Application } from "express";
import cors from "cors";
import { magenta, red, green } from "colors";
import { APP_ENVIROMENT } from "./app.enviroment";
import { sequelize } from "./app.database";
import { APP_ROUTES } from "./app.routes";

export class App {
  private _app: Application = express();
  private _port: string = APP_ENVIROMENT.PORT;

  constructor() {
    this._middlewares();
  }

  private _middlewares() {
    this._app.use(cors());
    this._app.use("/", APP_ROUTES);
  }

  private async _connectedDatabase(): Promise<boolean> {
    try {
      await sequelize.authenticate({});
      await sequelize.sync();
      console.log(green(`Database connected on host ${sequelize.config.host}`));
      return true;
    } catch (error) {
      console.log(red(`Connection error:`), error);
      return false;
    }
  }

  public startServer() {
    this._connectedDatabase().then((isConnected) => {
      if (isConnected)
        this._app.listen(this._port, async () => {
          console.log(magenta(`Server listening on port ${this._port}`));
        });
      else console.log(red(`Server offline`));
    });
  }
}
