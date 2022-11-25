<template>
    <div>
        <header>
            <div>
                <router-link :to="{ name: 'musicapp' }" class="title">
                    My Music
                </router-link>
            </div>
        </header>
        <main>
            <h3 class="mt-3 text-center">Thêm bài hát mới</h3>
            <form @submit.prevent="handleAddSong"
                class=" container-fluid d-flex justify-content-center align-item-center ">
                <div class="wrapper-add-song ">
                    <div class="form-group mt-5 row">
                        <div class="title-song col-md-4"><label for="nameSong">Tên bài hát:</label></div>
                        <div class="input-song col-md-8"><input type="text" id="nameSong" v-model="nameSong"
                                @input="handleNameSong">
                        </div>
                    </div>
                    <div class="form-group mt-5 row">
                        <div class="title-song col-md-4"><label for="thumbnail">Thumbnail:</label></div>
                        <div class="input-song col-md-8"><input type="text" id="thumbnail" v-model="thumb"
                                @input="handleThumbnail"></div>
                    </div>
                    <div class="form-group mt-5 row">
                        <div class="title-song col-md-4"><label for="avatarSinger">src bài hát:</label></div>
                        <div class="input-song col-md-8"><input type="text" id="avatarSinger" v-model="srcSong"
                                @input="handleSrcSong"></div>
                    </div>
                    <div class="form-group mt-5 row">
                        <div class="title-song col-md-4"><span> Ca sĩ cho bài hát trên:</span>
                        </div>
                        <div class="input-song col-md-8">
                            <select v-model="selectedSinger" @change="handleSelectSinger">
                                <option value="" disabled>Chọn ca sĩ</option>
                                <option v-for="singer in singers">{{ singer.nameSinger }}</option>
                                {{ selectedSinger }}
                            </select>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-5"><button class="btn btn-primary text-center"
                            type="submit">Thêm bài hát</button></div>
                </div>
            </form>
        </main>
    </div>
</template>

<script >
import singerService from '../services/singerService';
import songService from '../services/songService';
export default {
    data() {
        let nameSong = '';
        let thumb = '';
        let srcSong = '';
        let selectedSinger = '';
        let singers = [];
        return {
            nameSong,
            thumb,
            srcSong,
            selectedSinger,
            singers,
        }
    },

    methods: {
        handleNameSong() {
            console.log("nameSong:  ", this.nameSong);
        },
        handleThumbnail() {
            console.log("newThumbnail:  ", this.thumb);
        },
        handleSrcSong() {
            console.log("newSrcSong:  ", this.srcSong);
        },
        handleSelectSinger() {
            console.log("newSelectedSinger:  ", this.selectedSinger);
        },
        async getAllSingerFromAPI() {
            try {
                this.singers = await singerService.getAllSingers();
                console.log("call api singer ben add music:  ", this.singers[0]);
            } catch (error) {
                console.log(error);
            }
        },
        handleAddSong() {
            const newSong = {
                nameSong: this.nameSong,
                thumb: this.thumb,
                srcSong: this.srcSong,
                nameSinger: this.selectedSinger,
            }
            console.log("newsong:   ", newSong);
            songService.addNewSong(newSong);
            this.nameSong = '';
            this.thumb = '';
            this.srcSong = '';
            this.selectedSinger = '';
        }
    },
    mounted() {
        this.getAllSingerFromAPI();
    }
}
</script>

<style scoped>
.wrapper-add-song {
    max-width: 80%;
}

form {
    height: 30rem;
    max-height: 60rem;
    background-color: rgba(111, 232, 111, 0.781);
    border-radius: 8rem;
}

.title-song {
    color: #333;
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 0 -4rem;
}

.input-song input {
    border: 1px solid #333;
    outline: none;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: rgb(48, 181, 48);
    /* width: 20rem; */
    width: 100%;
    height: 1rem;
    padding: 1rem;

}

.input-song {
    width: 20rem;
}

.input-song select {
    border: 1px solid #333;
    outline: none;
    border-radius: 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: rgb(48, 181, 48);
    width: 100%;
    height: 2.2rem;
    text-align: center;
}

.input-song select option {
    text-align: center;
}

div button {
    width: 60%;
    font-size: 1rem;
    font-weight: 400;

}
</style>