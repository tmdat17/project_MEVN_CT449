import { createWebHistory, createRouter } from "vue-router";
import HomeMusic from "../views/HomeMusic.vue";
import SingerAdd from "../views/SingerAdd.vue";
import SongAdd from "../views/SongAdd.vue";
import DetailSinger from "../views/DetailSinger.vue";
const routes = [
    {
        path: "/",
        name: "musicapp",
        component: HomeMusic,
    },
    {
        path: "/singer/add",
        name: "singerAdd",
        component: SingerAdd,
    },
    {
        path: "/song/add",
        name: "songAdd",
        component: SongAdd,
    },
    {
        path: "/singer/:id",
        name: "singerDetail",
        component: DetailSinger,
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;
