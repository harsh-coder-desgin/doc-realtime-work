import axios from "axios"

const API = "/api/doc";

const User = {
    //Personal doc
    createdoc: async (data) => {
        try {
            const res = await axios.post(`${API}/createdoc`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    alldoc: async () => {
        try {
            const res = await axios.get(`${API}/alldoc`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    savedoc: async (data) => {
        try {
            const res = await axios.post(`${API}/savedoc/${data.id}`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    newdocsave: async (data) => {
        try {
            const res = await axios.post(`${API}/newdocsave`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    renamedoc: async (data) => {                
        try {
            const res = await axios.patch(`${API}/renamedoc/${data.id}`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getdoc: async (id) => {
        try {
            const res = await axios.get(`${API}/getdoc/${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    docdelete: async (data) => {
        try {
            const res = await axios.get(`${API}/docdelete/${data}`,{ withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //Organstion doc
    orgcreatedoc: async (data,id) => {
        try {
            const res = await axios.post(`${API}/orgcreatedoc/:${id}`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgname: async (data) => {
        try {
            const res = await axios.post(`${API}/orgname`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getorgname: async (id) => {
        try {
            const res = await axios.get(`${API}/getorgname/:${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgalldoc: async () => {
        try {
            const res = await axios.get(`${API}/orgalldoc`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    oneorgdocall: async () => {
        try {
            const res = await axios.get(`${API}/oneorgdocall`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgsavedoc: async (data,id) => {
        try {
            const res = await axios.post(`${API}/orgsavedoc/:${id}`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orggetdoc: async (id) => {
        try {
            const res = await axios.get(`${API}/orggetdoc/:${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgdeletedoc: async (id) => {
        try {
            const res = await axios.get(`${API}/orgdeletedoc/${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgnamedocget: async (id) => {
        try {
            const res = await axios.get(`${API}/orgnamedocget/${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    orgrenamedoc: async (data,id) => {
        try {
            const res = await axios.patch(`${API}/orgrenamedoc/${id}`,data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //inivite
    createinvite: async (data) => {
        try {
            const res = await axios.post(`${API}/createinvite`, data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    getinvite: async (id) => {
        try {
            const res = await axios.get(`${API}/getinvite/${id}`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    userinviteget: async () => {
        try {
            const res = await axios.get(`${API}/userinviteget`, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
    responseofinvite: async (data) => {
        try {
            const res = await axios.patch(`${API}/responseofinvite`,data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },

    //ai api
    airesponse: async (data) => {
        try {
            const res = await axios.post(`${API}/airesponse`,data, { withCredentials: true });
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
};
export default User;