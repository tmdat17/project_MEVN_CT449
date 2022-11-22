import createApiClient from "./api.service";
import axios from "axios";

const ContactService = {
    getAllSongs: async () => {
        try {
            return (await axios.get("http://localhost:3333/song/")).data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default ContactService;
