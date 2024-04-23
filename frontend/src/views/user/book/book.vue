<template>
    <div class="">

        <div class="mt-2 col-md-12">
            <h3 class="text-center my-4">
                Danh Mục Sách
            </h3>
            <div class="d-flex justify-content-center">
                <div class="my-2 px-5 col-md-6 align-items-center">
                    <InputSearch v-model="searchText" />
                </div>
            </div>
            <BookList v-if="Books.length > 0" :Books="filteredBooks" @deletebook="deletebook"
                v-model:activeIndex="activeIndex" />
            <p v-else>Không có sách nào.</p>

        </div>
    </div>
</template>

<script>
import BookList from "@/components/book/ListUser.vue";
import InputSearch from "@/components/Input_Search.vue";

import BookService from "@/services/book.service";

export default {
    components: {
        BookList,
        InputSearch,
    },
    data() {
        return {
            Books: [],
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
        activebook() {
            if (this.activeIndex < 0) return null;
            return this.Books[this.activeIndex];
        },
        bookString() {
            return this.Books.map((book) => {
                const { TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, TENNXB, TACGIA } = book;
                return [TENSACH, DONGIA, SOQUYEN, NAMXUATBAN, TENNXB, TACGIA].join("");
            });
        },
        filteredBooks() {
            if (!this.searchText) return this.Books;
            const searchTextLower = this.searchText.toLowerCase(); // Chuyển đổi chuỗi tìm kiếm thành chữ thường
            return this.Books.filter((book, index) => {
                const bookStringLower = this.bookString[index].toLowerCase(); // Chuyển đổi chuỗi sách thành chữ thường
                return bookStringLower.includes(searchTextLower);
            });
        },
    },
    methods: {
       
        async retrievebooks() {
            try {
                this.Books = await BookService.getAll();
                console.log(this.Books);
            } catch (error) {
                console.log(error);
            }
        },
        refreshList() {
            this.retrievebooks();
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