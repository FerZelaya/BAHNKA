const db = require('../../dao/db')
const { ObjectId } = require('mongodb')
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

    static async getAllLoans(){
        try{
            if(loansColl){
                let loans= await loansColl.find()
                return loans.toArray()
            }
            return []
        }catch(error){
            console.log(error)
            return error
        }
    }

    static async requestLoan(loan,paymentFrequency,amountOfPayments,interest) {
        try {
            let requestedLoan = {
                loan:loan,
                paymentFrequency:paymentFrequency,
                amountOfPayments:amountOfPayments,
                interest:interest
            }
            let result = await loansColl.insertOne(requestedLoan);
            return result
        }catch(error){
            console.log(error)
            return error
        }
    }

    static async deleteLoan(loanId){
        try{
            let filter = {"_id": new ObjectId(loanId)}
            const result = await loansColl.deleteOne(filter)
            return result
        }catch(error){
            console.log(error);
            return error
        }
    }
}