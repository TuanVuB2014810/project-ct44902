<template>
    <table class="table">
      <thead>
        <tr>
          <th scope="col-4">Tên</th>
          <th scope="col-4">Địa chỉ</th>
          <th scope="col-4">Hành động</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(nxb, index) in nxbs" :key="nxb._id" :class="{ active: index === activeIndex }" >
            <td>{{ nxb.TENNXB }}</td>
            <td>{{ nxb.DIACHI }}</td>
          <td>
            <router-link :to="{
              name:'editNxb',
              params:{id:nxb._id},
            }">
              <button class="mx-1 btn-sm btn-primary"><i class="fas fa-edit"></i></button>
            </router-link>
            <button class="btn btn-sm btn-danger" @click="deleteNxb(nxb._id)"><i class="fas fa-trash-alt"></i></button>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  
<script>
import { useRouter } from 'vue-router';

export default {
  emits: ["delete:nxb"],
  props: {
    nxbs: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const router = useRouter();

    const editNxb = (id) => {

      router.push({ name: 'editNxb', params: { id } });
    };
    return { editNxb,  };
  },
  methods: {
    deleteNxb(id) {
          console.log(id);
          this.$emit("deleteNxb",id);
       
      },
  },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>