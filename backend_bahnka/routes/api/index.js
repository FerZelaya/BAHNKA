//API Con switch
var express = require('express')
var router = express.Router()
var passport = require('passport')
var passportJWT = require('passport-jwt')

var extractJWT = passportJWT.ExtractJwt
var strategyJWT = passportJWT.Strategy

passport.use(
    new strategyJWT(
        {
            jwtFromRequest: extractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        (payload, next)=>{
            var user = payload
            return next(null, user)
        }
    )
)

var secRoutes = require('./sec')
var loansRoutes = require('./loans')


router.use("/sec", secRoutes)
router.use("/loans", loansRoutes)


module.exports = router;

