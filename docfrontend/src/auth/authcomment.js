import axios from "axios"

const API = "/api/comment";

const User = {
    //Comment doc
    createcomment: async (data) => {        
        try {
            const res = await axios.post(`${API}/createcomment`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getcomment: async () => {        
        try {
            const res = await axios.get(`${API}/getcomment`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    commentdelete: async (data) => {        
        try {
            const res = await axios.delete(`${API}/commentdelete`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //Reply doc
    createreply: async (data) => {        
        try {
            const res = await axios.post(`${API}/createreply`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getreply: async () => {        
        try {
            const res = await axios.get(`${API}/getreply`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    replydelete: async (data) => {        
        try {
            const res = await axios.delete(`${API}/replydelete`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //parentreply
    createparentreply: async (data) => {        
        try {
            const res = await axios.post(`${API}/createparentreply/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getparentreply: async (data) => {        
        try {
            const res = await axios.post(`${API}/getparentreply/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    parentreplydelete: async (data) => {        
        try {
            const res = await axios.delete(`${API}/parentreplydelete/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    allreply: async () => {        
        try {
            const res = await axios.get(`${API}/allreply`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
};
export default User;