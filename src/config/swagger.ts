import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Lending API',
      version: '1.0.0',
      description: 'Documentation for Book Lending System API'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    tags: [
      { name: 'Books', description: 'Book management endpoints' },
      { name: 'Members', description: 'Member management endpoints' },
      { name: 'Borrows', description: 'Book borrowing endpoints' }
    ]
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'] // paths to files containing annotations
};

const spec = swaggerJsdoc(options);

export default spec;