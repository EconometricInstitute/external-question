<template>
  <div>
    Should still implement this...
  </div>
</template>

<script>

export default {
  name: 'EditHyperFormulaQuestion',
  props: [
    'value', 'focused'
  ],
  data: () => ({
  }),
  methods: {
    valueChanged() {
      this.$emit('input', this.value);
    },
  },
};
</script>

<style scoped>

</style>