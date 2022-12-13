import config from "../config";
import { Request, Response, Application } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Smoove Api Doc",
      version: "1.0.0",
      description: "Documentaion for Smoove App",
    },
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerformat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    host: "localhost:7000",
    basePath: "/",
  },
  apis: ["../src/routes/playlist"],
};

const swaggerSpec = swaggerJSDoc(options);

//
export const swaggerDocs = (app: Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/docs.json", (req: Request, res: Response) => {
    res.setHeader("content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${config.port}/api-docs`);
};
