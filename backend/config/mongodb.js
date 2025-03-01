const mongoose = require("mongoose")

const connectDB =async()=>{

    
    await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)

    mongoose.connection.on("connected",()=>{
        console.log("Mongodb is successfully Connected")   
    })
}



module.exports = connectDB