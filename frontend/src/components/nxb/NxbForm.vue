<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="name">Tên nhà xuất bản</label>
      <Field v-if="nxbLocal && nxbLocal._id" v-model="nxbLocal.TENNXB" name="TENNXB" type="text" class="form-control" />
      <Field v-else @input="updateContact('TENNXB', $event.target.value)" name="TENNXB" type="text" class="form-control" placeholder="Nhập tên" />
      <ErrorMessage name="TENNXB" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field v-if="nxbLocal && nxbLocal._id" v-model="nxbLocal.DIACHI" name="DIACHI" type="text" class="form-control" />
      <Field v-else @input="updateContact('DIACHI', $event.target.value)" name="DIACHI" type="text" class="form-control" placeholder="Nhập địa chỉ" />
      <ErrorMessage name="DIACHI" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-success">Lưu</button>
    </div>
  </Form>
</template>

<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";

export default {
  components: { Form, Field, ErrorMessage },
  emits: ["submit:nxb", "update:nxb"],
  props: {
    nxb: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nxbLocal: { ...this.nxb },
      contactFormSchema: yup.object().shape({
        TENNXB: yup
          .string()
          .required("Tên là bắt buộc.")
          .min(2, "Tên phải có ít nhất 2 ký tự.")
          .max(50, "Tên không được vượt quá 50 ký tự."),
        DIACHI: yup
          .string()
          .required("Địa chỉ là bắt buộc.")
          .max(100, "Địa chỉ không được vượt quá 100 ký tự.")
      })
    };
  },
  methods: {
    submitContact() {
      if (!this.nxbLocal._id) {
        this.$emit("submit:nxb", this.nxbLocal);
      } else {
        this.$emit("update:nxb", this.nxbLocal);
      }
    },
    updateContact(fieldName, value) {
      this.nxbLocal[fieldName] = value;
    }
  }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
