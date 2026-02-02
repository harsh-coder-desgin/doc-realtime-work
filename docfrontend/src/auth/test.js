import axios from "axios"

const API = "/api/users";

const TEst = {
    test: async () => {        
        try {
            const res = await axios.get(`${API}/test`);
            return res
        } catch (error) {
            console.log(error);
            throw error
        }
    },
};
export default TEst;