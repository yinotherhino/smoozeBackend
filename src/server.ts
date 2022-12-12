import express from "express";
import morgan from "morgan";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
const app = express();
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


//:::contollers:::
import { protect } from "./middleware/auth/auth";
import { musicRouter, playlistRoute } from "./routes/index";
import { errorHandler, errorRouterHandler } from "./handlers/errorHandler";
import { signin, signup } from "./handlers/userHandler";

// ::::globals::::
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// ::::globals::::


const options: swaggerJSDoc.Options = {
    definition : {
      openapi: '3.0.0',
      info: { 
          title: 'Swagger API Documentation for Smoove App',
          version: '1.0.0',
          description: 'Documenting various apis for Smoove App',
      },
      components: {
          securitySchemas:{
              bearerAuth:{
                  type: 'http',
                  scheme: 'bearer',
                  bearerformat: "JWT"
              },
          },
      },
      security: [
          {
              bearerAuth: [],
          }
      ],
      host: 'localhost:7000',
      basePath: '/',
  },
    apis: ['./src/routes/playlist.ts']
  }
  
  
  const swaggerSpec = swaggerJSDoc(options);
  
  
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  
app.use("/api/music", protect, musicRouter);
app.use("/api/playlist", protect, playlistRoute);
app.post("/signup", signup);
app.post("/signin", signin);
app.use(errorRouterHandler);
app.use(errorHandler);


export default app;
