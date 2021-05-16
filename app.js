
const
  express = require('express'),
  schoolRoutes = require('./src/modules/schools/routes'),
  app = express(),
  port = process.env.PORT

  
// For reading env variables from .env file
// require('dotenv').config({ debug: process.env.DEBUG })

// App listen
app.listen(port, () =>  console.log('Listening on port', port))
app.use('/api/', schoolRoutes)

