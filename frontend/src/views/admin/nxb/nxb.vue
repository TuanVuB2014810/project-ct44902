<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <h3 class="text-center my-3">
                Nhà Xuất Bản
            </h3>
            <div class="my-3 row justify-content-between align-items-center">
                <router-link :to="{ name: 'nxb.add' }" class="px-3 col-sm-3">
                    <button class="btn btn-sm btn-success">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>
                <div class="col-md-4 mt-3">
                    <InputSearch v-model="searchText" />
                </div>
            </div>
            <NxbList v-if="nxbs.length > 0" :nxbs="filteredBooks" @deleteNxb="deleteNxb"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có nhà xuất bản nào.</p>

        </div>
    </div>
</template>

<script>
import NxbList from "@/components/nxb/NxbList.vue";
import NxbService from "@/services/nxb.service";
import InputSearch from "@/components/Input_Search.vue";

export default {
    components: {
        NxbList,
        InputSearch,
    },
    data() {
        return {
            nxbs: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    watch: {
        searchText() {
            this.activeIndex = -1;
        }
    },
    computed: {
        activeNxb() {
            if (this.activeIndex < 0) return null;
            return this.nxbs[this.activeIndex];
        },
        bookString() {
            return this.nxbs.map((nxb) => {
                const { TENNXB, DIACHI } = nxb;
                return [TENNXB, DIACHI].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.nxbs;
            const searchTextLower = this.searchText.toLowerCase(); // Chuyển đổi chuỗi tìm kiếm thành chữ thường
            return this.nxbs.filter((nxb, index) => {
                const bookStringLower = this.bookString[index].toLowerCase(); // Chuyển đổi chuỗi sách thành chữ thường
                return bookStringLower.includes(searchTextLower);
            });
        },
    },
    methods: {
        async deleteNxb(id) {
            if (confirm("Bạn muốn xóa nhà xuất bản này?")) {
                try {
                    await NxbService.delete(id);
                    // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async retrieveNxbs() {
            try {
                this.nxbs = await NxbService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveNxbs();
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
    max-width: 850px;
}
</style>
