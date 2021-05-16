const
  schools = require('../models/schools'),
  Joi = require('joi')

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
// Errors
function errorBadRequest (res, error = '') {
  res.status(400).send(error || 'Please enter valid Data')
  
}
function errorNotfound (res, error = '') {
  res.status(404).send(error || 'The school was not found ')
  
}
const methods = {
  
  
  /////////////////////////////
  // Get && search All Schools
  /////////////////////////////

  getSchools:((req, res) => {
    const
      hasSearch = Object.keys(req.query).length !== 0,
      searchBy = req.query
  
    let searchResult = []

    if (hasSearch) {
      for (const key in searchBy) {
        const value = searchBy[key]
        searchResult = schools.filter(s => s[key] === value)
      }

      if (searchResult.length) res.send(searchResult)
      else errorNotfound(res)
    } else res.send(schools)
  }),
  /////////////////////////////
  // Get a School by Id
  /////////////////////////////
  getSchoolById:((req, res) => {
    const
      matchedSchool = checkExisting(req.params.id)
  
    if (matchedSchool) res.send(matchedSchool)
    else errorNotfound(res)
 
  }),
  /////////////////////////////
  // add school
  /////////////////////////////
  addSchool: ((req, res) => {
    const newSchool = req.body,
      isValid = typeof checkValidation(newSchool) === 'boolean',
      errors = isValid ? '' : checkValidation(newSchool)
  
    if (isValid) {
      newSchool.id = schools.length + 1
      schools.push(newSchool)
      res.send(newSchool)
    } else   errorBadRequest(res, errors)
 

  }),
  /////////////////////////////
  // Delete school
  /////////////////////////////
  deleteSchool: ((req, res) => {
    const
      matchedSchool = checkExisting(req.params.id),
      matchedSchoolIndex = schools.indexOf(matchedSchool)
  
    if (matchedSchool) {
      schools.splice(matchedSchoolIndex, 1)
      res.send(schools)
    } else errorNotfound(res)
 
  }),
  /////////////////////////////
  // Update school
  /////////////////////////////
  updateSchool:((req, res) => {
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
    } else errorBadRequest(res, errors)
  })
}

module.exports = methods