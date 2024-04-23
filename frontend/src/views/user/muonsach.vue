<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <h3 class="text-center my-3">
                Danh Sách Mượn
            </h3>
            <DanhSachMuon v-if="DanhSachMuon.length > 0" v-model:activeIndex="activeIndex" :DanhSachMuon="DanhSachMuon"
                @updateDanhSachMuon="updateDanhSachMuon" />
            <p v-else>Không có mượn sách nào.</p>
        </div>
    </div>
</template>

<script>
import DanhSachMuon from "@/components/ListUser.vue";
import MuonSachService from "@/services/theodoimuonsach.service";

export default {
    components: {
        DanhSachMuon,
    },
    data() {
        return {
            DanhSachMuon: [],
            activeIndex: -1,
        };
    },
    methods: {
        async retrievebooks() {
            try {
                this.DanhSachMuon = await MuonSachService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievebooks();
        },
        updateDanhSachMuon(danhSachMuon) {
            this.DanhSachMuon = danhSachMuon;
        }

    },
    mounted() {
        this.refreshList();
    },

};
</script>

<style scoped>
.page {
    text-align: left;
    max-width: 950px;
}
</style>
