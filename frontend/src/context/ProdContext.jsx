// import { createContext, useState, useContext } from "react"
// import {
//     createProdRequest,
//     getProdsRequest,
//     deleteProdRequest,
//     getProdRequest,
//     updateProdRequest,
//     createRegistro } from '../api/prods';
// export const ProdContext = createContext()
//
// export const useProd = () => {
//     const context = useContext(ProdContext)
//     if (!context){
//         throw new Error("useProd no deberia estar dentro de un ProdProvider")
//     }
//     return context
// }
// export const ProdProvider = ({children}) => {
//     const [prod, setProd] = useState([])
//     const [user, setUser] = useState([])
//     const getProds = async (prod) => {
//         try {
//             const res = await getProdsRequest(prod)
//             console.log(res)
//             //console.log(res.data)
//             setProd(res.data)
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     const regProd  = async (prod) => {
//         const res = await createProdRequest(prod)
//         console.log(res)
//     }
//     const deleteProd = async (id) => {
//         const res = await deleteProdRequest(id)
//         if (res.status === 200)  setProd(prod.filter(prods => prods._id !== id))
//         console.log(res)
//     }
//     const getProd = async (id) => {
//         try {
//             const res = await getProdRequest(id)
//             return res.data
//             //console.log(res)
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     const updateProd = async (id,prod) => {
//         try {
//             await updateProdRequest(id,prod)
//         } catch (error) {
//             console.error(error)
//         }
//     }
//     const createReg = async (user) => {
//         const res = await createRegistro(user)
//         console.log(res)
//     }
//     return (
//         <ProdContext.Provider
//             value={{
//                 regProd,
//                 getProds,
//                 deleteProd,
//                 getProd,
//                 updateProd,
//                 prod,
//                 user,
//                 createReg
//             }}>
//             {children}
//         </ProdContext.Provider>
//     )
// }
//
//
