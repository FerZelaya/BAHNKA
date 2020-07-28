//API Con switch
var express = require('express')
var router = express.Router()

var secRoutes = require('./sec')
var loansRoutes = require('./loans')


router.use("/sec", secRoutes)
router.use("/loans", loansRoutes)


module.exports = router;
