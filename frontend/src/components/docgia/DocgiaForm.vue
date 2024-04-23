<template>
  <Form @submit="submitContact" :validation-schema="contactFormSchema">
    <div class="form-group">
      <label for="HOLOT">Họ và chữ lót</label>
      <Field name="HOLOT" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.HOLOT" />
      <Field name="HOLOT" type="text" class="form-control" placeholder=" Nhập tên" v-else @input="updateContact('HOLOT', $event.target.value)" ></Field>
      <ErrorMessage name="HOLOT" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="TEN">Tên</label>
      <Field name="TEN" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.TEN" />
      <Field name="TEN" type="text" class="form-control" placeholder=" Nhập đơn giá" v-else @input="updateContact('TEN', $event.target.value)" ></Field>
      <ErrorMessage name="TEN" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="NGAYSINH">Ngày sinh</label>
      <Field name="NGAYSINH" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.NGAYSINH" />
      <Field name="NGAYSINH" type="text" class="form-control" placeholder=" Nhập số quyển" v-else @input="updateContact('NGAYSINH', $event.target.value)" ></Field>
      <ErrorMessage name="NGAYSINH" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="PHAI">Giới tính</label>
      <Field name="PHAI" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.PHAI" />
      <Field name="PHAI" type="text" class="form-control" placeholder=" Nhập năm xuất bản" v-else @input="updateContact('PHAI', $event.target.value)" ></Field>
      <ErrorMessage name="PHAI" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DIACHI">Địa chỉ</label>
      <Field name="DIACHI" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.DIACHI" />
      <Field name="DIACHI" type="text" class="form-control" placeholder="Tác giả" v-else @input="updateContact('DIACHI', $event.target.value)" ></Field>
      <ErrorMessage name="DIACHI" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="DIENTHOAI">Số điện thoại</label>
      <Field name="DIENTHOAI" type="text" class="form-control" v-if="docgiaLocal && docgiaLocal._id" v-model="docgiaLocal.DIENTHOAI" />
      <Field name="DIENTHOAI" type="text" class="form-control" placeholder="Tác giả" v-else @input="updateContact('DIENTHOAI', $event.target.value)" ></Field>
      <ErrorMessage name="DIENTHOAI" class="error-feedback" />
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
  emits: ["submit:docgia", "update:docgia"],
  props: {
    docgia: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      docgiaLocal: { ...this.docgia },
      contactFormSchema: yup.object().shape({
        TEN: yup
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
      if (!this.docgiaLocal._id) {
        this.$emit("submit:docgia", this.docgiaLocal);
      } else {
        this.$emit("update:docgia", this.docgiaLocal);
      }
    },
    updateContact(fieldName, value) {
      this.docgiaLocal[fieldName] = value;
    }
  }
};
</script>

<style scoped>
@import "@/assets/form.css";
</style>
