import axios from "axios";

const SingerService = {
    getAllSingers: async () => {
        try {
            return (await axios.get("http://localhost:3333/singer/")).data;
        } catch (error) {
            console.log(error);
        }
    },
    getOneSinger: async (id) => {
        try {
            return (await axios.get(`http://localhost:3333/singer/${id}`)).data;
        } catch (error) {
            console.log(error);
        }
    },
    addNewSinger: async (newSinger) => {
        try {
            return (
                await axios.post("http://localhost:3333/singer/add", newSinger)
            ).data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default SingerService;
