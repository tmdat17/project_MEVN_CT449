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
            <h1 class="text-center mt-2">Thông tin bài hát</h1>
            <div class="infor-song">
                <div class="mt-5 row">
                    <h3 class="col-md-4 d-flex justify-content-end " style="width: 15rem">Tên bài hát: </h3>
                    <span class="col-md-4 d-flex justify-content-center ">{{ song.nameSong }}</span>
                    <img class="col-md-4 d-flex justify-content-end" :src="song.thumb" alt="">
                </div>
                <div class="mt-5 row ">
                    <h3 class="col-md-4 d-flex justify-content-end" style="width: 20rem">Bài hát này của: </h3>
                    <span class="col-md-4 d-flex justify-content-center ">{{ singerOfSong.nameSinger }}</span>
                </div>
                <div class="control-song">

                    <router-link :to="{
                        name: 'songEditInfor',
                        params: { id: song._id },
                    }">
                        <div class="btn btn-edit">Chỉnh sửa thông tin bài hát</div>
                    </router-link>
                    <div class="btn btn-delete" @click="handleDeleteSong">Xóa bài hát</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import songService from '../services/songService';
export default {
    data() {
        let message = '';
        return {
            song: {},
            singerOfSong: {},
            message,
        }
    },
    methods: {
        async getOneSong() {
            try {
                const res = await songService.getOneSong(this.$route.params.id);
                console.log("song:   ", res);
                this.song = res;
                this.singerOfSong = this.song.singer;
            } catch (error) {
                console.log(error);
            }
        },

        async handleDeleteSong() {
            if (confirm("Bạn có chắc chắn xóa?")) {
                try {
                    this.message = await songService.deleteSong(this.$route.params.id);
                    this.$router.push({ name: "musicapp" });
                } catch (error) {
                    console.log(error);
                }
            }
        }

    },

    created() {
        this.getOneSong();

    }

}
</script>

<style scoped>
.infor-song {
    height: 30rem;
    max-height: 60rem;
    background-color: rgba(111, 232, 111, 0.781);
    border-radius: 8rem;
}

.infor-song h3 {
    font-weight: 500;
}

.infor-song div {
    position: relative;
}

.infor-song div img {
    height: 8rem;
    width: 10rem;
    margin-left: 5rem;
    position: absolute;
    top: -100%;
    right: 20%;
    background-color: rgb(255, 255, 255);
}

.infor-song div span {
    font-size: 1.5rem;
}


.list-song {

    padding: 0 1rem 1rem 0;
    height: 5rem;
    overflow: scroll;
    overflow-x: hidden;
}

.list-song li {
    list-style: none;
    font-size: 1.5rem;
    margin-left: 4rem;
}

.control-song {
    margin-top: 5rem;
    display: flex;
    justify-content: center;

}

.control-song .btn-edit {
    margin-right: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 10px 20px 10px 20px;
    border: 2px solid rgb(64, 0, 255);
    border-radius: 10rem;
    background-color: cyan;
    transition: all .225s;
}

.control-song .btn-edit:hover {
    background-color: rgba(0, 255, 255, 0.721);
}

.control-song .btn-delete {
    margin-left: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 10px 20px 10px 20px;
    border: 2px solid #333;
    border-radius: 10rem;
    background-color: rgb(236, 104, 104);
    color: aliceblue;
    transition: all .225s;
}

.control-song .btn-delete:hover {
    background-color: rgba(236, 104, 104, 0.721);
}
</style>