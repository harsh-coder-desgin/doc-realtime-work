import axios from "axios"

const API = "/api/doc";

const User = {
    //Personal doc
    createdoc: async (data) => {        
        try {
            const res = await axios.post(`${API}/createdoc`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    alldoc: async () => {        
        try {
            const res = await axios.get(`${API}/alldoc`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    savedoc: async (data) => {        
        try {
            const res = await axios.post(`${API}/savedoc/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    newdocsave: async (data) => {        
        try {
            const res = await axios.post(`${API}/newdocsave`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getdoc: async () => {        
        try {
            const res = await axios.get(`${API}/getdoc/:id`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    docdelete: async (data) => {        
        try {
            const res = await axios.delete(`${API}/docdelete`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //Organstion doc
    orgcreatedoc: async (data) => {        
        try {
            const res = await axios.post(`${API}/orgcreatedoc`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgalldoc: async () => {        
        try {
            const res = await axios.get(`${API}/orgalldoc`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgsavedoc: async (data) => {        
        try {
            const res = await axios.post(`${API}/orgsavedoc/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orggetdoc: async () => {        
        try {
            const res = await axios.get(`${API}/orggetdoc/:id`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgdeletedoc: async (data) => {        
        try {
            const res = await axios.delete(`${API}/orgdeletedoc/:id`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //inivite
    createinvite: async (data) => {        
        try {
            const res = await axios.post(`${API}/createinvite`,data,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getinvite: async () => {        
        try {
            const res = await axios.get(`${API}/getinvite`,{ withCredentials: true});
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
};
export default User;