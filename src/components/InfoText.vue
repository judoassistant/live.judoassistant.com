<template>
  <template v-if="icon != null">
    <p v-if="rotating" class="info-text-rotating-icon">
      <span :class="iconClass"></span>
    </p>
    <p v-else class="info-text-icon">
      <span :class="iconClass"></span>
    </p>
  </template>
  <p class="info-text">
    <slot></slot>
  </p>
</template>

<script>
export default {
  name: 'InfoText',
  props: {
    icon: String,
    rotating: Boolean,
  },
  computed: {
    iconClass: function() {
      const res = {};
      res['mdi'] = true;
      res['mdi-' + this.icon] = true;
      return res;
    },
  },
}
</script>

<style scoped lang="scss">
  @import "../styles/constants.module.scss";

  @keyframes spinning {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }

  .info-text {
      text-align: center;
      color: $color4;
      font-size: 1.1em;
  }

  .info-text-icon {
    text-align: center;
    color: $color4;
    font-size: 3em;
  }

  .info-text-rotating-icon {
    text-align: center;
    color: $color4;
    font-size: 3em;
    animation: spinning 1s infinite linear;
  }


</style>
