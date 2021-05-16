
const
  express = require('express'),
  path = require('path'),
  app = express(),
  port = process.env.PORT,
  Joi = require('joi'),
  schools = require('./modules/schools/models/schools'),
  resource = '/api/schools'
  
// For reading env variables from .env file
require('dotenv').config({ debug: process.env.DEBUG })

// App listen 
app.listen(port, () =>  console.log('Listening on port', port))

/////////////////////////////
// Middleware Functions
/////////////////////////////
app.use(express.json())
/////////////////////////////
// Common Function
/////////////////////////////
function checkExisting (schoolId) {
  
  const matchedSchool = schools.find(s => s.id == schoolId)
  
  if (matchedSchool) return matchedSchool
  else return false
}
function checkValidation (data) {
  const schema = Joi.object({
      name: Joi.string().required(),
      phone: Joi.string().length(11).required(),
      email:Joi.string().email().required()
    }),
    {error} = schema.validate(data)

  if (error) return (error.details.map(d => d.message)).join(',')
  else return true
}
/////////////////////////////
// App Route
/////////////////////////////
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})
/////////////////////////////
// Get && search All Schools
/////////////////////////////
app.get(`${resource}`, (req, res) => {
  const
    hasSearch = Object.keys(req.query).length !== 0,
    searchBy = req.query
  
  let searchResult = []

  if (hasSearch) {
    for (const key in searchBy) {
      const value = searchBy[key]
      searchResult = schools.filter(s => s[key] === value)
    }

    if (searchResult.length)     res.send(searchResult)
    else res.status(404).send('The school was not found ')
  } else  res.send(schools)
})
/////////////////////////////
// Get a School by Id
/////////////////////////////
app.get(`${resource}/:id`, (req, res) => {
  const 
    matchedSchool = checkExisting(req.params.id)
  
  if (matchedSchool) res.send(matchedSchool)
  else res.status(404).send('The school was not found ')
 
})
/////////////////////////////
// add school
/////////////////////////////
app.post(`${resource}`, (req, res) => {
  const newSchool = req.body,
    isValid = typeof checkValidation(newSchool) === 'boolean',
    errors = isValid ? '' : checkValidation(newSchool)
  
  if (isValid) {
    newSchool.id = schools.length + 1
    schools.push(newSchool)
    res.send(newSchool)
  } else {
    res.status(400).send(errors)
  }

})
/////////////////////////////
// Delete school
/////////////////////////////
app.delete(`${resource}/:id`, (req, res) => {
  const 
    matchedSchool = checkExisting(req.params.id),
    matchedSchoolIndex = schools.indexOf(matchedSchool)
  
  if (matchedSchool) {
    schools.splice(matchedSchoolIndex, 1)
    res.send(schools)
  } else res.status(404).send('The school was not found ')
 
})
/////////////////////////////
// Update school
/////////////////////////////
app.put(`${resource}/:id`, (req, res) => {
  const
    schoolId = req.params.id,
    
    updatedSchool = req.body,
    matchedSchool = checkExisting(schoolId),

    isValid = typeof checkValidation(updatedSchool) === 'boolean',
    errors = isValid ? '' : checkValidation(updatedSchool)
  
  if (isValid) {
   
    for (const key in updatedSchool) {
      console.log('key', key)
      matchedSchool[key] = updatedSchool[key]
    }
       
     
    res.send(schools)
  } else res.status(400).send(errors)
})