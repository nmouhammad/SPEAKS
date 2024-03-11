<script>
  // @group Components
  // Component listening globally for keydown events and emits them up
  export default {
    name: 'KeyboardListener',
    emits: ['keydown'],
    // when this component is created, add a keydown-listener globally
    // like this you don't need to e.g. click on the corresponding
    // component first before your keydown events are registered
    created() {
      const component = this
      this.handler = function (e) {
        component.$emit('keydown', e)
      }
      window.addEventListener('keydown', this.handler)
    },
    // when this component is not needed anymore, remove the global listener
    beforeUnmount() {
      window.removeEventListener('keydown', this.handler)
    }
  }
</script>

<template>
  <div></div>
</template>
