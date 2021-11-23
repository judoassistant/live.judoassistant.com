<template>
  <input :id="id" :type="type" :value="modelValue" @input="updateInput" class="input" />
</template>

<script>
export default {
  name: "SearchInput",
  props: {
    id: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: [String, Number],
      default: "",
    },
    type: {
      type: String,
      default: "text",
    }
  },
  methods: {
    updateInput(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  .input {
      padding: 10px 20px;
      background-color: white;
      border-radius: 3px;
      border: $color2 1px solid;

      width: 100%;
      box-sizing: border-box;
      border-radius: 110px;
  }
</style>

