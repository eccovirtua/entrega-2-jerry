// ejemplo del profe

import axios from './axios'

export const getProdsRequest = () => axios.get('/prod')
export const getProdRequest = (id) => axios.get(`/prod/${id}`)
export const createProdRequest = (producto) => axios.post('/prod',producto)
export const updateProdRequest = (id,producto) => axios.put(`/prod/${id}`,producto)
export const deleteProdRequest = (id) => axios.delete(`/prod/${id}`)

export const createRegistro = (registro) => axios.post('/registro',registro)
