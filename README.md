# Schools API

## [dotenv](https://www.npmjs.com/package/dotenv)
is a zero-dependency module that loads environment variables from a .env file
into process.env

<br/>
<br/>

***


## **MVC**
- **MVC** is short for **M**odel, **V**iew, and **C**ontroller.
- It's an **architectural pattern** that separates an application into three main
  logical components Model , view and controller 
  - **Model** that part of the application that ( handles || stores )** data** and its related logic
  - **View** that part of the application that represent  the presentation of data (**UI components**).
  - **Controller** is that part of the application that handles the **user interaction**

<br/>
<br/>

*Example from daily life* :


<img src="https://www.guru99.com/images/1/122118_0445_MVCTutorial2.png">
        
        View = You
        Waiter = Controller
        Cook = Model
        Refrigerator = Data

<br/>

***So, to sum it up:***

- **Model** is data part.
- **View** is User Interface part.
- **Controller** is request-response handler.


<br/>

### Node mvc project structure :
<img
src="https://media.geeksforgeeks.org/wp-content/uploads/project-structure.png">


- **routes folder**, which will serve as controllers.
- **models folder**, in which we have a data model.
- **views folder**, which have our views 

<br/>
<br/>
<br/>

***resources:***
-  [MVC Tutorial for Beginners: What is, Architecture & Example ](https://www.guru99.com/mvc-tutorial.html)
-   [ماهو مبدأ Model View Controller (MVC) ؟ (للمبتدئين)](https://3alam.pro/marwaalgethami/articles/mvc) 
-   [Model-View-Controller(MVC) architecture for Node applications](https://www.geeksforgeeks.org/model-view-controllermvc-architecture-for-node-applications/)

<br/>
<br/>
<br/>

**** 
## **HMVC**
- It's short for  **H**ierarchical    **M**odel **V**iew **C**ontroller
- Separate the app into  Modules with MVC pattern 

***Resources*** :
-  [Laravel 5.8 lesson 1 introduction hmvc architectural pattern](https://youtu.be/V1NI2rrThbo) 
-  [MVC vs HMVC for web application development](https://stackoverflow.com/a/30301846/4015523)

<br/>
<br/>
<br/>

**** 

## [**Routing**](https://expressjs.com/en/guide/routing.html)


- You can create chainable route handlers for a route path by using app.route().

  -  single location, 
  -  creating modular routes is helpful
  -  as is reducing redundancy and typos. 


-  For more information about routes, see: [Router() documentation.](https://expressjs.com/en/4x/api.html#router)

*example of chained route handlers ( route : `/api/schools` )*

      const
        express = require('express'),
        app = express()
        resource = '/api/schools'

      // chained route
      app.route(`${resource}`)
        // Get && search All Schools
        .get(schoolController.crud.getSchools)
        // add school
        .post(schoolController.crud.addSchool)

<br>

- **express.Router** class for creating modular, mountable and chained route handlers
- **A router object** is an isolated instance of *middleware* and routes.

*example of express route handlers ( route : `/api/schools` )*

      const
        express = require('express'),
        app = express()
        router = express.Router()
        resource = '/api/schools'

      // chained route
      router.route(`${resource}`)
        // Get && search All Schools
        .get(schoolController.crud.getSchools)
        // add school
        .post(schoolController.crud.addSchool)


<br/>
<br/>
<br/>


**** 

## **Middleware** 
- It's basically a function which accepts `request` and `response`
objects and a `next()` function. 
        
        app.use(function middleware1(req, res, next) {
          console.log('Middleware 1')
        next();
        });