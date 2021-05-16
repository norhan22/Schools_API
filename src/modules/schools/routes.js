const
  express = require('express'),
  app = express(),
  router = express.Router(),
  resource = '/schools',
  schoolController = {
    crud: require('./controllers/CURDController'),
    views: require('./controllers/viewControllers')
  }
  
app.use(express.json())

/////////////////////////////
// App Route

router.get('/', schoolController.views.home)

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


// Chained Route Handlers

router.route(`${resource}`)
// Get && search All Schools
  .get(schoolController.crud.getSchools)
  // add school
  .post(schoolController.crud.addSchool)


// By ID 
router.route(`${resource}/:id`)
// Get a School 
  .get(schoolController.crud.getSchoolById)
// Delete school
  .delete(schoolController.crud.deleteSchool)
// Update school
  .put(schoolController.crud.updateSchool)
  
module.exports = router