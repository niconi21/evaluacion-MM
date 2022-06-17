export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Evaluación API",
      version: "1.0.0",
      description: "Una Api de publicaciónes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
      {
        url: "https://nmoreno-evaluacion.ga/",
      },
    ],
  },
  apis: ["openApi.yaml"],
};
