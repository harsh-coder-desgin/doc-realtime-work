import axios from "axios"

const API = "/api/user";

const User = {
    register: async (data) => {        
        try {
            const res = await axios.post(`${API}/register`,data);
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    login: async (data) => {        
        try {
            const res = await axios.post(`${API}/login`,data);
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    logout: async (data) => {        
        try {
            const res = await axios.post(`${API}/logout`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    refreshtoken: async () => {        
        try {
            const res = await axios.post(`${API}/refreshtoken`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    verifyuserauth: async () => {     
        try {            
            const res = await axios.get(`${API}/verifyauth`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getuser: async () => {        
        try {
            const res = await axios.get(`${API}/getuser`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    changepassword: async (data) => {        
        try {
            const res = await axios.post(`${API}/changepassword`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    editprofile: async (data) => {        
        try {
            const res = await axios.patch(`${API}/editprofile`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
};
export default User;