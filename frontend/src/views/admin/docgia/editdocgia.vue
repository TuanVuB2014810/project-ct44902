<template>
    <div v-if="docgia" class="page">
        <h4 class="text-center">Chỉnh sửa thông tin đọc giả</h4>
        <DocgiaForm :docgia="docgia" @update:docgia="updateDocgia"></DocgiaForm>
        <p class="text-success">{{ message }}</p>
    </div>
</template>

<script>
import DocgiaForm from "@/components/docgia/DocgiaForm.vue";
import DocgiaService from "@/services/docgia.service";

export default {
    components: {
        DocgiaForm,
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            docgia: null,
            message: "",
        };
    },
    methods: {
        async getDocgia(id) {
            try {
                this.docgia = await DocgiaService.get(id);
            } catch (error) {
                console.log(error);
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateDocgia(data) {
            try {
                await DocgiaService.update(this.id, data);
                this.message = "Đọc giả được cập nhật thành công.";
            } catch (error) {
                console.log(error);
            }
        },
    },
    created() {
        this.getDocgia(this.id);
        this.message = "";
    },
};
</script>
