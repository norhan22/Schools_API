
const
  express = require('express'),
  path = require('path'),
  server = express(),
  port = process.env.PORT || 3000,
  Joi = require('joi'),
  schools = [
    {
      id: 1,
      name: 'School 1',
      phone: '012345678',
      email:'school1@ex.com'
            
    },
    {
      id: 2,
      name: 'School 2',
      phone: '012345678',
      email:'school2@ex.com'
            
    },
    {
      id: 3,
      name: 'School 3',
      phone: '012345678',
      email:'school3@ex.com'
            
    },
    {
      id: 4,
      name: 'School 4',
      phone: '012345678',
      email:'school4@ex.com'
            
    }
  ],
  resource = '/api/schools'
  
server.listen(port, () => console.log('Listening on port', port))
server.use(express.json())
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
server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
})
/////////////////////////////
// Get && search All Schools
/////////////////////////////
server.get(`${resource}`, (req, res) => {
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
server.get(`${resource}/:id`, (req, res) => {
  const 
    matchedSchool = checkExisting(req.params.id)
  
  if (matchedSchool) res.send(matchedSchool)
  else res.status(404).send('The school was not found ')
 
})
/////////////////////////////
// add school
/////////////////////////////
server.post(`${resource}`, (req, res) => {
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
server.delete(`${resource}/:id`, (req, res) => {
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
server.put(`${resource}/:id`, (req, res) => {
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