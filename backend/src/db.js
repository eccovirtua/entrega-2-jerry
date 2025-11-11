import mongoose from "mongoose"

export const connectDB = async () => {
    try{
        await mongoose.connect("mongodb://localhost:27017/SistemaPracticas")
        console.log(">>> Base de Datos (SistemaPracticas) Conectada")
    }catch(error){
        console.log(error)
    }
}
