import { readFileSync } from "fs";
import https from "https";

import express from "express";
import { Application } from "express";
import cors from "cors";
import { magenta, red, green } from "colors";
import { sequelize } from "./app.database";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { APP_ENVIROMENT } from "./app.enviroment";
import { APP_ROUTES } from "./app.routes";
import { options } from "./swagger.config";

export class App {
  public app: Application = express();
  private _port: string = APP_ENVIROMENT.PORT;

  constructor() {
    this._middlewares();
  }

  private _middlewares() {
    this._swagger();
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use("/", APP_ROUTES);
  }

  private _swagger() {
    const specs = swaggerJsDoc(options);
    this.app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));
  }

  private async _connectDatabase(): Promise<boolean> {
    try {
      await sequelize.authenticate();
      await sequelize.sync({ force: true });
      // await sequelize.sync();
      console.log(green(`Database connected on host ${sequelize.config.host}`));
      return true;
    } catch (error) {
      console.log(red(`Connection error:`), error);
      return false;
    }
  }

  // public async startServer(): Promise<boolean> {
  //   try {
  //     await this._connectDatabase();
  //   } catch (error) {
  //     console.log(red(`Server offline`));
  //   }

  //   return new Promise<boolean>(async (resolve, reject) => {
  //     let isConnected = await this._connectDatabase();
  //     if (isConnected) {
  //       this.app.listen(this._port, async () => {
  //         console.log(magenta(`Server listening on port ${this._port}`));
  //         resolve(true);
  //       });
  //     } else {
  //       console.log(red(`Server offline`));
  //       reject(false);
  //     }
  //   });
  // }
  public startServer() {
    this._connectDatabase()
      .then((isConnected) => {
        if (isConnected) {
          if (APP_ENVIROMENT.ENV == "dev") {
            this.app.listen(this._port, async () => {
              console.log(magenta(`Server listening on port ${this._port}`));
            });
          } else if (APP_ENVIROMENT.ENV == "prod") {
            const httpsOptions: https.ServerOptions = {
              key: readFileSync(`${APP_ENVIROMENT.PATH_SSL}/privkey.pem`),
              cert: readFileSync(`${APP_ENVIROMENT.PATH_SSL}/cert.pem`),
              ca: readFileSync(`${APP_ENVIROMENT.PATH_SSL}/chain.pem`),
            };
            https
              .createServer(httpsOptions, this.app)
              .listen(process.env.PORT, () => {
                console.log(magenta(`Listen on port ${APP_ENVIROMENT.PORT}`));
              });
          }
        } else console.log(red(`The server is not online`));
      })
      .finally(() => {
        console.log(green(`Enviroment: ${APP_ENVIROMENT.ENV}`));
      });
  }
}
