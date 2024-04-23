<template>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">Họ và chữ lót</th>
        <th scope="col">Tên</th>
        <th scope="col">Giới tính</th>
        <th scope="col">Địa chỉ</th>
        <th scope="col">Số điện thoại</th>
        <th scope="col">Hành động</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(docgia, index) in docgias" :key="docgia._id" :class="{ active: index === activeIndex }">
        <td>{{ docgia.HOLOT }}</td>
        <td>{{ docgia.TEN }}</td>
        <td>{{ docgia.PHAI }}</td>
        <td>{{ docgia.DIACHI }}</td>
        <td>{{ docgia.DIENTHOAI }}</td>
        <td>
          <router-link :to="{ name:'editDocgia', params:{id:docgia._id} }">
            <button class="mx-1 btn btn-sm btn-primary"><i class="fas fa-edit"></i></button>
          </router-link>
          <button class="btn btn-sm btn-danger" @click="deleteDocgia(docgia._id)"><i class="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  emits: ["deleteDocgia"],
  props: {
    docgias: {
      type: Array,
      default: () => []
    },
  },
  setup() {
    const router = useRouter();

    const editDocgia = (id) => {
      // Chuyển hướng sang trang chỉnh sửa nhà xuất bản với id tương ứng
      router.push({ name: 'editDocgia', params: { id } });
    };

    return { editDocgia };
  },
  methods: {
    deleteDocgia(id) {
      console.log(id);
      this.$emit("deleteDocgia",id);
    },
  },
};
</script>

<style scoped>
  @import "@/assets/form.css";
</style>
