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
            <h3 class="mt-3 text-center">Chỉnh sửa thông tin ca sĩ</h3>
            <div class="mt-3 text-primary text-center fw-bold" style="fontSize: 1.3rem">{{ message }}</div>
            <form @submit.prevent="handleEditSinger" class=" d-flex justify-content-center align-item-center ">
                <div class="wrapper-add-singer ">
                    <div class="form-group mt-5 row">
                        <div class="title-singer col-md-4"><label for="nameSinger">Tên ca sĩ:</label></div>
                        <div class="input-singer col-md-8"><input type="text" id="nameSinger" v-model="nameSinger">
                        </div>
                    </div>
                    <div class="form-group mt-5 row">
                        <div class="title-singer col-md-4"><label for="avatarSinger">Avatar:</label></div>
                        <div class="input-singer col-md-8"><input type="text" id="avatarSinger" v-model="avtSinger">
                        </div>
                    </div>
                    <div class="d-flex justify-content-center mt-5"><button class="btn btn-primary text-center"
                            type="submit">Chỉnh sửa ca sĩ</button></div>
                </div>
            </form>
        </main>
    </div>
</template>

<script>
import singerService from '../services/singerService';
export default {
    data() {
        let nameSinger = '';
        let avtSinger = '';
        let message = '';
        return {
            nameSinger,
            avtSinger,
            message,
            singer: {},
        }
    },
    methods: {

        async getOneSinger() {
            try {
                const res = await singerService.getOneSinger(this.$route.params.id);
                console.log("singer:   ", res);
                this.singer = res;
                this.nameSinger = this.singer.nameSinger;
                this.avtSinger = this.singer.avt;
                console.log("namesinger:  ", this.nameSinger);
            } catch (error) {
                console.log(error);
            }
        },

        async handleEditSinger() {
            try {
                const singerNeedEdit = {
                    nameSinger: this.nameSinger,
                    avt: this.avtSinger,
                }
                this.message = await singerService.editSinger(this.$route.params.id, singerNeedEdit);

            } catch (error) {
                console.log(error);
            }
        }
    },
    created() {
        this.getOneSinger();

    }


}
</script>

<style  scoped>
.wrapper-add-singer {
    max-width: 100%;
}

form {
    height: 30rem;
    max-height: 60rem;
    background-color: rgba(111, 232, 111, 0.781);
    border-radius: 8rem;
}


.title-singer {
    color: #333;
    font-size: 1.4rem;
    font-weight: 600;
    margin: 0 0 0 -4rem;
}

.input-singer input {
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

.input-singer {
    width: 25rem;
}

div button {
    width: 60%;
    font-size: 1rem;
    font-weight: 400;

}
</style>