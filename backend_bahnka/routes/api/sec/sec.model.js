const db = require('../../dao/db')
const ObjectId = require('mongodb').ObjectId
const bcrypt = require('bcrypt')
const { use } = require('passport')
const e = require('express')

let userColl

module.exports = class {

    static async initModel(){
        if(!userColl){
            let _db = await db.getDB()
            userColl = await _db.collection('usuarios');
            if(process.env.ENSUREINDEX == "1"){
                //console.log('User index being created');
                await userColl.createIndex({"email":1},{unique:true})
            }
            console.log("Users collection created");
            return
        }else{
            return
        }
    }


    //Sign Up
    static async signUp(data){
        const {firstName, lastName, email, phone, idCard, password, type } = data

        try {
            let newUser = {
                "firstName":firstName,
                "lastName":lastName,
                "email":email,
                "phone":phone,
                "idCard":idCard,
                "password": bcrypt.hashSync(password,10),
                "type":type,
                "roles": ["public"]
            }
            let result = await userColl.insertOne(newUser)
            return result
        } catch(error){
            console.log(error);
            return error
        }
    }


    //Get user by email
    static async getByEmail(email){
        try{
            let filter = {"email":email}
            let user = await userColl.findOne(filter)
            return user 
        }catch(error){
            console.log(error);
            return error
        }
    }

    //Compare Password
    static async comparePassword( rawPassword, cryptedPassword) {
        try{
            return bcrypt.compareSync(rawPassword,cryptedPassword)
        }catch(error){
            return false
        }
    }


}