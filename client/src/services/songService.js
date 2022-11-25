import axios from "axios";

const SongService = {
    getAllSongs: async () => {
        try {
            return (await axios.get("http://localhost:3333/song/")).data;
        } catch (error) {
            console.log(error);
        }
    },
    getOneSong: async (id) => {
        try {
            return (await axios.get(`http://localhost:3333/song/${id}`)).data;
        } catch (error) {
            console.log(error);
        }
    },
    addNewSong: async (newSong) => {
        try {
            return (await axios.post("http://localhost:3333/song/add", newSong))
                .data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default SongService;
