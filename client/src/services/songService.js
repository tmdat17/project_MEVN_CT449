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
    editSong: async (id, songNeedEdit) => {
        try {
            return (
                await axios.put(
                    `http://localhost:3333/song/edit/${id}`,
                    songNeedEdit
                )
            ).data;
        } catch (error) {
            console.log(error);
        }
    },
    deleteSong: async (id) => {
        try {
            return (
                await axios.delete(`http://localhost:3333/song/delete/${id}`)
            ).data;
        } catch (error) {
            console.log(error);
        }
    },
};
export default SongService;
