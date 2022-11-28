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
            <h1 class="text-center mt-2">Thông tin ca sĩ</h1>
            <div class="infor-singer">
                <div class="mt-5 d-flex justify-content-center">
                    <h3 class="" style="width: 15rem">Tên ca sĩ: </h3>
                    <span>{{ singer.nameSinger }}</span>
                    <img :src="singer.avt" alt="">
                </div>
                <div class="mt-5 d-flex justify-content-center ">
                    <h3 class="" style="width: 20rem">Các bài hát của {{ singer.nameSinger }}: </h3>
                    <div class="list-song">
                        <li v-if="songOfSinger.length == 0"> Chưa có bài hát nào!! </li>
                        <ul v-else>
                            <li v-for="song in songOfSinger">- {{ song.nameSong }}</li>
                        </ul>
                    </div>
                </div>
                <div class="control-singer">

                    <router-link :to="{
                        name: 'singerEditInfor',
                        params: { id: singer._id },
                    }">
                        <div class="btn btn-edit">Chỉnh sửa thông tin ca sĩ</div>
                    </router-link>
                    <div class="btn btn-delete" @click="handleDeleteSinger">Xóa ca sĩ</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import singerService from '../services/singerService';

export default {
    data() {
        let message = '';
        return {
            singer: {},
            songOfSinger: [],
            message,
        }
    },
    methods: {
        async getOneSinger() {
            try {
                const res = await singerService.getOneSinger(this.$route.params.id);
                console.log("singer:   ", res);
                this.singer = res;
                this.singer.songs.map((item) => this.songOfSinger.push(item));
            } catch (error) {
                console.log(error);
            }
        },

        async handleDeleteSinger() {
            if (confirm("Bạn có chắc chắn xóa?")) {
                try {
                    this.message = await singerService.deleteSinger(this.$route.params.id);
                    this.$router.push({ name: "musicapp" });
                } catch (error) {
                    console.log(error);
                }
            }
        }

    },

    created() {
        this.getOneSinger();

    }

}

</script>

<style scoped>
.infor-singer {
    height: 30rem;
    max-height: 60rem;
    background-color: rgba(111, 232, 111, 0.781);
    border-radius: 8rem;
}

.infor-singer h3 {
    font-weight: 500;

}

.infor-singer div {
    position: relative;

}

.infor-singer div img {
    border-radius: 50%;
    height: 7rem;
    width: 7rem;
    margin-left: 5rem;
    position: absolute;
    top: -100%;
    right: 20%;
    box-shadow: 0 0 0 0.5rem white;
}

.infor-singer div span {
    font-size: 1.5rem;
    margin-left: 10rem;
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

.control-singer {
    margin-top: 5rem;
    display: flex;
    justify-content: center;

}

.control-singer .btn-edit {
    margin-right: 3rem;
    font-size: 1.3rem;
    font-weight: 600;
    padding: 10px 20px 10px 20px;
    border: 2px solid rgb(64, 0, 255);
    border-radius: 10rem;
    background-color: cyan;
    transition: all .225s;
}

.control-singer .btn-edit:hover {
    background-color: rgba(0, 255, 255, 0.721);
}

.control-singer .btn-delete {
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

.control-singer .btn-delete:hover {
    background-color: rgba(236, 104, 104, 0.721);
}
</style>