<script>
  // @group Components
  // Component listening globally for keydown events and emits them up
  export default {
    name: 'KeyboardListener',
    emits: [
      /**
       * Emit "next" if ArrowRight, Enter or Space have been pressed
       * @event next
       */
      'next',
      /**
       * Emit "previous" if ArrowLeft has been pressed
       * @event previous
       */
      'previous'
    ],
    // when this component is created, add a keydown-listener globally
    // like this you don't need to e.g. click on the corresponding
    // component first before your keydown events are registered
    created() {
      const component = this
      this.handler = function (e) {
        // if any of the following keys is pressed, 'next' should be emitted
        const keysTriggeringNext = ['ArrowRight', 'Enter', ' ']
        // if any of the following keys is pressed, 'previous' should be emitted
        const keysTriggeringPrevious = ['ArrowLeft']
        const pressedKey = event.key

        // check whether the pressedKey is in the array keysTriggeringNext
        if (keysTriggeringNext.indexOf(pressedKey) !== -1) {
          component.$emit('next')
        }
        // check whether the pressedKey is in the array keysTriggeringPrevious
        if (keysTriggeringPrevious.indexOf(pressedKey) !== -1) {
          component.$emit('previous')
        }
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
