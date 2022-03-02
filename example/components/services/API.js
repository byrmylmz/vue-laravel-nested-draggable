import axios from "axios"
import store from "../../store"

export const apiClient=axios.create({
    baseURL: process.env.VUE_APP_API_URL + "/api",
    withCredentials: true, // required to handle the CSRF token
    headers:{
        Authorization:'Bearer 1|TZklhuJKbvLuvxKVvlggC3vcAPy5PQTq9dBtjjL3',
    }    
})


  