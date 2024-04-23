<template>
    <div class="row">
        <div class="card col-sm-3 col-lg-3 ml-1" v-for="(book, index) in Books" :key="book._id"
            :class="{ active: index === activeIndex }">
            <div>
                <div class="card-body">
                    <h5 class="card-title"><strong>{{ book.TENSACH }}</strong></h5>
                    <h6 class="card-subtitle mb-2 text-muted">Tác giả: {{ book.TACGIA }} </h6>
                    <hr>
                    <p><strong>Số lượng:</strong> {{ book.SOQUYEN }}</p>
                    <p><strong>Năm xuất bản:</strong> {{ book.NAMXUATBAN }}</p>
                    <p><strong>Nhà xuất bản:</strong> {{ book.TENNXB }}</p>
                    <p><strong>Đơn giá:</strong> <span class="price">{{ formatCurrency(book.DONGIA) }}</span></p>
                    <a href="#" class="btn btn-outline-primary" @click="muonSach(book._id)">Mượn sách</a>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import { useRouter } from 'vue-router';
import NXBService from "@/services/nxb.service";
import muonsachService from '@/services/theodoimuonsach.service';
import { mapGetters } from "vuex";


export default {

    props: {
        Books: {
            type: Array,
            default: () => []
        }
    },

    async created() {
        for (let i = 0; i < this.Books.length; i++) {
            const book = this.Books[i];
            const maNXB = book.MANXB;

            console.log(maNXB);
            const response = await NXBService.get(maNXB);

            book.TENNXB = response.TENNXB;
        }// Đảm bảo rằng phương thức getAll() trong service đã được triển khai
    },
    setup() {
        const router = useRouter();

        const editbook = (id) => {
            router.push({ name: 'book.edit', params: { id } });
        };
        return { editbook, };
    },
    methods: {
        formatCurrency(amount) {
            // Định dạng số tiền thành dạng tiền tệ
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
        },
        async muonSach(bookId) {
            const router = useRouter();

            const userId = this.loggedInUser.id;
            const data = {
                MASACH: bookId,
                MADOCGIA: userId
            };
            try {
                await muonsachService.create(data);
               
                const confirmViewButton = confirm("Đã đăng ký mượn thành công");
                if (confirmViewButton) {
                    this.$router.push('/muon-sach');
                }
            } catch (error) {
                console.error("Lỗi khi mượn sách:", error);
                window.alert("Đã xảy ra lỗi khi mượn sách!");
            }
        }
    },
    computed: {
        ...mapGetters(["loggedInUser"]),
    },
};
</script>
<style scoped>
/* Định dạng cho thẻ card */
.card {
    margin-bottom: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: 0.3s;
}

.card:hover {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Định dạng cho tiêu đề */
.card-title {
    font-size: 1.2rem;
}

/* Định dạng cho thông tin sách */
.card-text {
    display: flex;
    flex-wrap: wrap;
}

.card-text p {
    flex: 0 0 50%;
    margin-bottom: 5px;
}

/* Định dạng cho nút mượn sách */
.btn-outline-danger {
    color: #dc3545;
    border-color: #dc3545;
    margin-top: 10px;
}

.btn-outline-primary:hover {
    background-color: #2671d4;
    color: #fff;
}
.price {
    color: red;
    font-size: 1.2em; /* Tăng kích thước font */
}
.row{
    margin-left: 200px !important;
}
</style>