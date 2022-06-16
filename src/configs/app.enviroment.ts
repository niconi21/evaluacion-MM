export const APP_ENVIROMENT = {
  PORT: process.env.PORT || '3000',
};

export const DATABASE_ENVIROMENT = {
  USERNAME: process.env.USERNAME_DB || 'root',
  PASSWORD: process.env.PASSWORD_DB || 'nodeisjs',
  HOST: process.env.HOST_DB || 'localhost',
  DATABASE: process.env.DATABASE_DB || 'nmorenodb',
};
