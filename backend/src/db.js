import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/Ferreteria")
        console.log("BD conectada")
    }catch(error){
        console.log()
    }
}
