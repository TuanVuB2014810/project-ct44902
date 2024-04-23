<template>
    <div class="input-group">
        <input type="text" class="form-control" placeholder="Nhập thông tin cần tìm" :value="modelValue"
        @input="updateModelValue" @keyup.enter="submitOnEnter" />
    </div>
</template>

<script>
export default {
    props: {
        modelValue: {
            type: String,
            default: ""
        },
    },
    emits: ["submit", "update:modelValue"],
    methods: {
        updateModelValue(e) {
            this.$emit("update:modelValue", e.target.value);
        },
        submitOnEnter(e) {
            if (e.key === 'Enter') {
                this.$emit("submit");
            }
        },
        submit() {
            this.$emit("submit");
        },
    },
};
</script>
