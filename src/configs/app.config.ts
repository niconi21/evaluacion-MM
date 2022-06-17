import express from "express";
import { Application } from "express";
import cors from "cors";
import { magenta, red, green } from "colors";
import { APP_ENVIROMENT } from "./app.enviroment";
import { sequelize } from "./app.database";
import { APP_ROUTES } from "./app.routes";

export class App {
  public app: Application = express();
  private _port: string = APP_ENVIROMENT.PORT;

  constructor() {
    this._middlewares();
  }

  private _middlewares() {
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use("/", APP_ROUTES);
  }

  private async _connectDatabase(): Promise<boolean> {
    try {
      await sequelize.authenticate();
      await sequelize.sync({force: true});
      // await sequelize.sync();
      console.log(green(`Database connected on host ${sequelize.config.host}`));
      return true;
    } catch (error) {
      console.log(red(`Connection error:`), error);
      return false;
    }
  }

  public startServer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      let isConnected = await this._connectDatabase();
      if (isConnected) {
        this.app.listen(this._port, async () => {
          console.log(magenta(`Server listening on port ${this._port}`));
          resolve(true)
        });
      } else {
        console.log(red(`Server offline`));
        reject(false);
      }
      
    });
  }
}
