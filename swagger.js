import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    title: 'soREST API',
    description: 'Description',
  },
  components: {
    schemas: {
      addUser: {
        $username: 'abid',
        $fullName: 'sainul Abid',
        $email: 'abid123@gmail.com',
        $password: 'Passw0rd$',
      },
      loginUser: {
        $email: 'abid123@gmail.com',
        $pasword: 'Passw0rd$',
      },
    },
  },
  host: 'localhost:3000',
}

const outputFile = './swagger-output.json'
const routes = ['./src/app.js']

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc)
