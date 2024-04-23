<template>
    <table class="table">
        <thead>
            <tr>
                <th scope="col">Tên sách</th>
                <th scope="col">Tên đọc giả</th>
                <th scope="col">Ngay mượn</th>
                <th scope="col">Ngày trả</th>
                <th scope="col">Trạng thái</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(muonsach, index) in DanhSachMuon" :key="muonsach._id" :class="{ active: index === activeIndex }">
                <template v-if="loggedInUser.username === muonsach.TENDOCGIA">
                    <td>{{ muonsach.TENSACH }}</td>
                    <td>{{ muonsach.TENDOCGIA }}</td>
                    <td>{{ muonsach.NGAYMUON }}</td>
                    <td>{{ muonsach.NGAYTRA }}</td>
                    <td>
                        <template v-if="muonsach.TRANGTHAI === 0">Đang chờ duyệt</template>
                        <template v-else-if="muonsach.TRANGTHAI === 1 && !muonsach.NGAYTRA">Đang mượn</template>
                        <template v-else>Đã trả sách</template>
                    </td>
                </template>
            </tr>


        </tbody>
    </table>
</template>

<script>

import bookService from "@/services/book.service";
import DocgiaService from "@/services/docgia.service";
import MuonSachService from "@/services/theodoimuonsach.service";
import { mapGetters } from "vuex";

export default {
    props: {
        DanhSachMuon: {
            type: Array,
            default: () => []
        }
    },
    async created() {
        await this.fetchBookDetails();
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
    methods: {
        async fetchBookDetails() {
            for (let i = 0; i < this.DanhSachMuon.length; i++) {
                const muonsach = this.DanhSachMuon[i];
                const masach = muonsach.MASACH;
                const madocgia = muonsach.MADOCGIA;
                const response = await bookService.get(masach);
                const responseDOCGIA = await DocgiaService.get(madocgia);

                muonsach.TENSACH = response.TENSACH;
                muonsach.TENDOCGIA = responseDOCGIA.TEN;
            }
        },
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