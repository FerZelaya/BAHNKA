const db = require('../../dao/db')
const ObjetId = require('mongodb').ObjectId


let loansColl

module.exports = class {
    //initModel
    static async initModel(){
        if(!loansColl){
            let _db = await db.getDB()
            loansColl = await _db.collection('loans')
            console.log("Loans collection created")
            return
        } else {
            return
        } 
    }


    static async requestLoan(loan,paymentFrequency,amountOfPayments,interest) {
        try {
            let loan = {
                loan:loan,
                paymentFrequency:paymentFrequency,
                amountOfPayments:amountOfPayments,
                interest:interest
            }
            let result = await loansColl.insertOne(loan);
            return result
        }catch(error){
            console.log(error)
            return error
        }
    }
}