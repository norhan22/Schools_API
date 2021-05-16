const
  path = require('path'),

  methods = {
    home: ((req, res) => {
      res.sendFile(path.join(__dirname, '../views/index.html'))

    })
  }
module.exports = methods
