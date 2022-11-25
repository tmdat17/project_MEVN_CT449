<template>
    <div id="app">
        <header>
            <div>
                <router-link :to="{ name: 'musicapp' }" class="title">
                    My Music
                </router-link>
            </div>
        </header>
        <main class="row">
            <div class="col-md-8">
                <div class="row">
                    <div class="col-md-4">
                        <div class="btn btn-dark p-2 m-3" @click="displayListSinger">
                            Danh sách các ca sĩ
                        </div>

                        <router-link to='/singer/add' class="title">
                            <div class="btn btn-dark p-2 m-3">Thêm ca sĩ mới</div>
                        </router-link>

                        <router-link to='/song/add' class="title">
                            <div class="btn btn-dark p-2 m-3">Thêm bài hát mới</div>
                        </router-link>

                    </div>
                    <div class="col-md-8">
                        <h2 v-if="isDisplayListSinger" class="text-center mb-5">
                            Danh sách các ca sĩ
                        </h2>
                        <ul v-if="isDisplayListSinger" class="list-singer">

                            <li class="item-singer" v-for="singer in singers">
                                <router-link :to="{
                                    name: 'singerDetail',
                                    params: { id: singer._id },
                                }">
                                    <div>
                                        <span>
                                            {{ singer.nameSinger }}
                                        </span>
                                        <img :src="singer.avt" alt="" />
                                    </div>
                                </router-link>

                            </li>
                            <hr style="margin-top: 1.4rem" />
                        </ul>

                    </div>
                </div>
            </div>
            <div class="col-md-4 play-music">
                <section class="player">
                    <h2 v-if="current == null" class="song-title">
                        Chưa chọn bài hát.
                    </h2>
                    <h2 v-else class="song-title">
                        {{ current?.nameSong }}
                        <span style="display: block">{{
                                current?.nameSinger
                        }}</span>
                    </h2>

                    <div class="time">
                        <input @change="handleChangeBar" type="range" name="range" id="range" class="range" />
                    </div>
                    <div class="timer">
                        <div class="durationTime">{{ durationTime }}</div>
                        <div class="remainingTime">- {{ remainingTime }}</div>
                    </div>

                    <div class="controls">
                        <button class="prev" @click="prev">Prev</button>
                        <button class="play" v-if="!isPlaying" @click="play">
                            Play
                        </button>
                        <button class="pause" v-else @click="pause">
                            Pause
                        </button>
                        <button class="next" @click="next">Next</button>
                    </div>
                </section>
                <section class="playlist">
                    <h3>The Playlist</h3>
                    <div>
                        <button v-for="song in songs" :key="song?.srcSong" @click="play(song)" :class="
                            song?.srcSong == current?.srcSong
                                ? 'song playing'
                                : 'song'
                        ">
                            {{ song?.nameSong }} - {{ song?.nameSinger }}
                        </button>
                    </div>
                </section>
            </div>
        </main>
    </div>
</template>

<script>
import songService from "../services/songService";
import singerService from "../services/singerService";
import SingerAdd from "./SingerAdd.vue"
export default {
    name: "app",
    components: {
        SingerAdd
    },
    data() {

        return {
            current: {},
            index: 0,
            isPlaying: false,
            isDisplayListSinger: false,

            songs: [],
            singers: [],
            player: new Audio(),
            durationTime: "00:00",
            remainingTime: "00:00",
            range: {
                max: 0,
                value: 0,
            },
        };
    },
    methods: {
        async getAllSongFromAPI() {
            try {
                this.songs = await songService.getAllSongs();
                console.log("call api song:  ", this.songs[0]);
            } catch (error) {
                console.log(error);
            }
        },
        async getAllSingerFromAPI() {
            try {
                this.singers = await singerService.getAllSingers();
                console.log("call api singer:  ", this.singers[0]);
            } catch (error) {
                console.log(error);
            }
        },

        refreshList() {
            this.getAllSongFromAPI();
            this.getAllSingerFromAPI();
            this.isDisplayListSinger = false;
            this.index = 0;
        },
        displayListSinger() {
            this.isDisplayListSinger = !this.isDisplayListSinger;
        },

        play(song) {
            if (typeof song?.srcSong != "undefined") {
                this.current = song;

                this.player.src = this.current?.srcSong;
            }
            setInterval(() => {
                this.displayTimer();
            }, 500);
            this.player.play();
            this.player.addEventListener(
                "ended",
                function () {
                    this.index++;
                    if (this.index > this.songs.length - 1) {
                        this.index = 0;
                    }

                    this.current = this.songs[this.index];
                    this.play(this.current);
                }.bind(this)
            );
            this.isPlaying = true;
        },
        pause() {
            this.player.pause();
            this.isPlaying = false;
        },
        next() {
            this.index++;
            if (this.index > this.songs.length - 1) {
                this.index = 0;
            }

            this.current = this.songs[this.index];
            this.play(this.current);
        },
        prev() {
            this.index--;
            if (this.index < 0) {
                this.index = this.songs.length - 1;
            }

            this.current = this.songs[this.index];
            this.play(this.current);
        },

        formatTimer(number) {
            const minutes = Math.floor(number / 60);
            const seconds = Math.floor(number - minutes * 60);
            return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds
                }`;
        },

        displayTimer() {
            const { duration, currentTime } = this?.player;
            range.max = duration;
            range.value = currentTime;
            this.remainingTime = this.formatTimer(currentTime);
            if (!duration) {
                this.durationTime = "00:00";
            } else {
                this.durationTime = this.formatTimer(duration);
            }
        },
        handleChangeBar() {
            this.player.currentTime = range.value;
        },
    },
    created() {
        this.refreshList();
        this.current = this.songs[this.index];
        this.player.src = this.current?.srcSong;
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: sans-serif;
}

header {
    padding: 15px;
    background-color: #212121;
    color: #fff;
}

main {
    width: 100%;

    margin: 0 auto;
    padding: 25px;
}

header div {
    display: flex;
    justify-content: center;
    align-items: center;
}

.title {
    font-size: 1.5rem;
    color: white;
}

.title:hover {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.679);
}

.song-title {
    color: #53565a;
    font-size: 32px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
}

.song-title span {
    font-weight: 400;
    font-style: italic;
}

.time {
    display: flex;
    justify-content: center;
    align-items: center;
}

.timer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 14px;
    color: #999;
    margin-bottom: 40px;
}

.range {
    -webkit-appearance: none;
    /* Hides the slider so that custom slider can be made */
    width: 50%;
    /* Specific width is required for Firefox. */
    background: transparent;
    /* Otherwise white in Chrome */
    margin: 20px 0 20px 0;
}

.range::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background-color: rgba(0, 252, 97, 0.933);
}

.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    background-color: rgb(0, 255, 217);
    width: 15px;
    height: 15px;
    border-radius: 100rem;
    margin-top: -8px;
    box-shadow: 0 0 1px 5px rgba(223, 7, 65, 0.229);
}

.controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 15px;
}

button {
    appearance: none;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
}

button:hover {
    opacity: 0.8;
}

.play,
.pause {
    font-size: 20px;
    font-weight: 700;
    padding: 15px 25px;
    margin: 0px 15px;
    border-radius: 8px;
    color: #fff;
    background-color: #ed391d;
}

.next,
.prev {
    font-size: 16px;
    font-weight: 700;
    padding: 10px 20px;
    margin: 0px 15px;
    border-radius: 6px;
    color: #fff;
    background-color: #04874893;
}

.playlist {
    padding: 0px 30px;
}

.playlist div {
    height: 15rem;
    overflow: scroll;
    overflow-x: hidden;

}

.playlist h3 {
    color: #212121;
    font-size: 28px;
    font-weight: 400;
    margin-bottom: 30px;
    text-align: center;
}

.playlist .song {
    display: block;
    width: 100%;
    padding: 15px;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
}

.playlist .song:hover {
    color: #ff5858;
}

.playlist .song.playing {
    color: #fff;
    background-image: linear-gradient(to right, #2b9d57, #28cc43);
}

.play-music {
    position: relative;
}

.play-music:before {
    content: "";
    position: absolute;
    height: 100%;
    width: 1px;
    background-color: rgba(51, 51, 51, 0.159);
}

.list-singer {
    height: 27.5rem;
    overflow: scroll;
    overflow-x: hidden;

}

.item-singer {
    list-style: none;
}

.item-singer div {
    display: flex;
    justify-content: space-between;
    align-items: center;

    font-size: 1.3rem;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.225s;
    max-height: 100px;
}

.item-singer div span {
    padding: 20px;
    color: #333;
}

.item-singer div img {
    width: 20%;
    height: 20%;
    border-radius: 50%;
    padding: 20px;
}

.item-singer div:hover {
    background-color: rgba(102, 98, 98, 0.307);
}
</style>
