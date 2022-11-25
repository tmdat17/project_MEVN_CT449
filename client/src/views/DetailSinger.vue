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
                        <li v-for="song in songOfSinger">{{ song.nameSong }}</li>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import singerService from '../services/singerService';
import songService from '../services/songService';
export default {
    data() {

        return {
            singer: {},
            songOfSinger: [],
        }
    },
    methods: {
        async getOneSinger() {
            try {
                const res = await singerService.getOneSinger(this.$route.params.id);
                this.singer = res;
                this.singer.songs.map((item) => this.songOfSinger.push(item));
            } catch (error) {
                console.log(error);
            }
        },

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
</style>