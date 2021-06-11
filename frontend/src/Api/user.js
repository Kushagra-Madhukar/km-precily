import axios from 'axios'
import {API_ENDPOINT} from '../config'

export const AddUser = async (payload) => {
    try{
        let newUser = await axios.post(`${API_ENDPOINT}/addEntry`, {name: payload.name, number: payload.number})
        return newUser
    }
    catch(err) {
        console.log(err)
    }
}

export const UpdateUser = async (payload, id) => {
    try {
        let updatedUser = await axios.put(`${API_ENDPOINT}/${id}`, {name: payload.name, number: payload.number})
        return updatedUser
    } 
    catch(err) {
        console.log(err)
    }
}

export const getAllUsers = async () => {
    try {
        let allUsers = await axios.get(`${API_ENDPOINT}/allData`)
        return allUsers
    }
    catch(err){
        console.log(err)
    }
}