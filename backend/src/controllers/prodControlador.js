// import Prod from '../models/prodModel.js'
//
// export const getProds = async (req,res) => {
//     try {
//         const prod = await Prod.find()
//         res.json(prod)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const createProd = async (req,res) => {
//     const {name,description,category,price,stock} = req.body
//     const newProd = new Prod({
//         name,description,category,price,stock
//     })
//     try {
//         const saveProd = await newProd.save()
//         res.json(saveProd)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const getProd = async (req,res) => {
//     try {
//         const prod = await Prod.findById(req.params.id)
//         if (!prod) return res.send("No encontrado")
//         res.json(prod)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const updateProd = async (req,res) => {
//     try {
//         const prod = await Prod.findByIdAndUpdate(req.params.id,req.body,{new:true})
//         res.json(prod)
//     } catch (error) {
//         console.log(error)
//     }
// }
// export const deleteProd = async (req,res) => {
//     try {
//         const prod = await Prod.findByIdAndDelete(req.params.id)
//         if (!prod) return res.json("No encontrado")
//         res.json(prod)
//     } catch (error) {
//         console.log(error)
//     }
// }
