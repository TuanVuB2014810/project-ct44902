<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Tên sách</th>
                <th scope="col">Tên đọc giả</th>
                <th scope="col">Ngày mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Hành động</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(muonsach, index) in DanhSachMuon" :key="muonsach._id"
                :class="{ active: index === activeIndex }">
                <td>{{ muonsach.TENSACH }}</td>
                <td>{{ muonsach.TENDOCGIA }}</td>
                <td>{{ muonsach.NGAYMUON }}</td>
                <td>
                    <template v-if="muonsach.TRANGTHAI === 1 && muonsach.NGAYTRA === null">
                        Chưa trả
                    </template>
                    <template v-else>
                        {{ muonsach.NGAYTRA }}
                    </template>
                </td>
                <td>
                    <template v-if="muonsach.TRANGTHAI === 0">
                        <button @click="Duyetmuon(muonsach._id)" class="btn btn-success">Duyệt</button>
                    </template>
                    <template v-else-if="muonsach.TRANGTHAI === 1 && muonsach.NGAYTRA == null">
                        <button @click="TraSach(muonsach._id)" class="btn btn-primary">Trả sách</button>
                    </template>
                    <template v-else>
                        <p>Đã trả sách</p>
                    </template>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import bookService from "@/services/book.service";
import DocgiaService from "@/services/docgia.service";
import MuonSachService from "@/services/theodoimuonsach.service";
export default {
    props: {
        DanhSachMuon: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        async Duyetmuon(muonsachId) {
            try {
                await MuonSachService.duyet(muonsachId);
                this.$emit('updateDanhSachMuon', await MuonSachService.getAll());
            } catch (error) {
                console.error("Lỗi khi duyệt mượn sách:", error);
            }
        },
        async TraSach(muonsachId) {
            try {
                await MuonSachService.tra(muonsachId);
                this.$emit('updateDanhSachMuon', await MuonSachService.getAll());
            } catch (error) {
                console.error("Lỗi khi trả sách:", error);
            }
        },
        async fetchBookDetails() {
            for (let i = 0; i < this.DanhSachMuon.length; i++) {
                const muonsach = this.DanhSachMuon[i];
                const masach = muonsach.MASACH;
                const madocgia = muonsach.MADOCGIA;
                const response = await bookService.get(masach);
                console.log(response);
                
                const responseDOCGIA = await DocgiaService.get(madocgia);
                console.log(responseDOCGIA);

                muonsach.TENSACH = response.TENSACH;
                console.log(masach.TENSACH);

                muonsach.TENDOCGIA = responseDOCGIA.TEN;
                console.log(muonsach.TENDOCGIA);
            }
        }
    },
    mounted() {
        // Gọi fetchBookDetails khi component được tạo ra
        this.fetchBookDetails();
    },
    watch: {
        // Watch for changes in props.DanhSachMuon
        DanhSachMuon: {
            handler: 'fetchBookDetails', // Call fetchBookDetails when props.DanhSachMuon changes
            deep: true // Watch changes deeply in props.DanhSachMuon
        }
    }
};
</script>
<style scoped>
  @import "@/assets/form.css";
</style>