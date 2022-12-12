import  { Request, Express, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'


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
    host: 'localhost:3000',
    basePath: '/',
},
  apis: ['../src/routes/playlist']
}



const swaggerSpec = swaggerJSDoc(options);


    const swaggerDocs = (app:Express, port:number) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('docs.json', (req: Request, res:Response) => {
    res.setHeader('content-Type', 'application/json')
    res.send(swaggerSpec)
    })

console.log(`Docs available at http://localhost:${port}/api-docs`)
}

export default swaggerDocs