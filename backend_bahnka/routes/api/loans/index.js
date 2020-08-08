//Loans Routes
var express = require('express')
var router = express.Router()
const model = require('./loans.model')

const init = async () =>{
    await  model.initModel()
}
init()

router.get('/allLoans', async(req,res)=>{
    try{
        //var user = req.user._id
        let loans = await model.getAllLoans()
        res.status(200).json(loans)
    }catch(error){
        console.log(error)
        res.status(500).json({"ERROR":"Unable to show loans"})
    }
})//Show loan GET

router.post('/requestLoan', async(req,res)=>{
    try{
        var {loan,paymentFrequency,amountOfPayments,interest} = req.body
        //var user = req.body
        var result = await model.requestLoan(loan,paymentFrequency,amountOfPayments,interest)
        res.status(200).json(result)
    } catch(error) {
        console.log(error)
        res.status(500).json({"ERROR":"Unable to request loan"})
    }
})//Request loan POST


router.delete('/deleteLoan/:loanId', async(req,res)=>{
    try{
        const {loanId} = req.params
        const result = await model.deleteLoan(loanId)
        res.status(200).json(result)
    }catch(error){
        console.log(error);
        res.status(500).json({"ERROR":"Unable to delete loan"})
    }
})

module.exports = router;
