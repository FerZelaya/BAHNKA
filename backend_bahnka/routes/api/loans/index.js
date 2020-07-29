//Loans Routes
var express = require('express')
var router = express.Router()
const model = require('./loans.model')

const init = async () =>{
    await  model.initModel()
}
init()

router.post('/requestLoan', async(req,res)=>{
    try{
        var {loan,paymentFrequency,amountOfPayments,interest} = req.body
        var result = await model.requestLoan(loan,paymentFrequency,amountOfPayments,interest)
        res.status(200).json(result)
    } catch(error) {
        console.log(error)
        res.status(500).json({"ERROR":"Unable to request loan"})
    }
})

module.exports = router;
