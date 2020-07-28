//Loans Routes
var express = require('express')
var router = express.Router()

router.get('/', function(req,res){
    res.status(200).json(
        [
            {
                route:"/", 
                description:"API documentation",
                bodu:"",
                params:"",
                resp:"json"
        }
        ]
    )
})


module.exports = router;
