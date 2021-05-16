
const
  express = require('express'),
  schoolController = {
    crud: require('./src/modules/schools/controllers/CURDController'),
    views: require('./src/modules/schools/controllers/viewControllers')
  },
  
  app = express(),
  port = process.env.PORT,
  resource = '/api/schools'
  
// For reading env variables from .env file
// require('dotenv').config({ debug: process.env.DEBUG })
// App listen 
app.listen(port, () =>  console.log('Listening on port', port))

/////////////////////////////
// Middleware Functions
/////////////////////////////
app.use(express.json())

/////////////////////////////
// App Route
/////////////////////////////
app.get('/', schoolController.views.home)
/////////////////////////////
// Get && search All Schools
/////////////////////////////
app.get(`${resource}`, schoolController.crud.getSchools)
/////////////////////////////
// Get a School by Id
/////////////////////////////
app.get(`${resource}/:id`, schoolController.crud.getSchoolById)
/////////////////////////////
// add school
/////////////////////////////
app.post(`${resource}`, schoolController.crud.addSchool)
/////////////////////////////
// Delete school
/////////////////////////////
app.delete(`${resource}/:id`, schoolController.crud.deleteSchool)
/////////////////////////////
// Update school
/////////////////////////////
app.put(`${resource}/:id`, schoolController.crud.updateSchool)