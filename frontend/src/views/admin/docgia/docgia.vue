<template>
    <div class="page row">
        <div class="mt-3 col-md-12">
            <h3 class="text-center my-3">
                Quản Lý Đọc Giả
            </h3>
            <div class="my-3 row justify-content-between align-items-center">
                <router-link :to="{ name: 'docgia.add' }" class="col-sm-3">
                    <button class="btn btn-sm btn-success ">
                        <i class="fas fa-plus"></i> Thêm mới
                    </button>
                </router-link>
                <div class="col-sm-4">
                    <InputSearch v-model="searchText" />
                </div>
            </div>
            <DocgiaList v-if="docgias.length > 0" :docgias="filteredDocgias" @deleteDocgia="deleteDocgia" v-model:activeIndex="activeIndex" />
            <p v-else>Không có đọc giả.</p>

        </div>
    </div>
</template>


<script>
import DocgiaList from "@/components/docgia/DocgiaList.vue";
import DocgiaService from "@/services/docgia.service";
import InputSearch from "@/components/Input_Search.vue";

export default {
    components: {
        DocgiaList,
        InputSearch,
    },
    data() {
        return {
            docgias: [],
            activeIndex: -1,
            searchText: "",
        };
    },
    computed: {
        activeDocgia() {
            if (this.activeIndex < 0) return null;
            return this.docgias[this.activeIndex];
        },
        docgiaString() {
            return this.docgias.map((docgia) => {
                const { TEN, HOLOT, PHAI, DIACHI, DIENTHOAI} = docgia;
                return [TEN, HOLOT, PHAI, DIACHI, DIENTHOAI].join("");
            });
        },
        filteredDocgias() {
            if (!this.searchText) return this.docgias;
            const searchTextLower = this.searchText.toLowerCase();
            return this.docgias.filter((docgia, index) => {
                const docgiaStringLower = this.docgiaString[index].toLowerCase();
                return docgiaStringLower.includes(searchTextLower);
            });
        },
    },
    methods: {
        async deleteDocgia(id) {
            if (confirm("Bạn muốn xóa đọc giả này?")) {
                try {
                    await DocgiaService.delete(id);
                    this.refreshList();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        async retrieveDocgias() {
            try {
                this.docgias = await DocgiaService.getAll();
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrieveDocgias();
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
