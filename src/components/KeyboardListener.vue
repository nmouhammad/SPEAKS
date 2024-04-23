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
      this.keydownHandler = function (e) {
        // if any of the following keys is pressed, 'next' should be emitted
        const keysTriggeringNext = ['ArrowRight', 'Enter', ' ', 'ArrowDown']
        // if any of the following keys is pressed, 'previous' should be emitted
        const keysTriggeringPrevious = ['ArrowLeft', 'ArrowUp']
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
      window.addEventListener('keydown', this.keydownHandler)

      // add a listener triggering "next" when a click somewhere is recognised
      this.clickHandler = function (e) {
        component.$emit('next')
      }
      window.addEventListener('click', this.clickHandler)
    },
    // when this component is not needed anymore, remove the global listeners
    beforeUnmount() {
      window.removeEventListener('keydown', this.keydownHandler)
      window.removeEventListener('click', this.clickHandler)
    }
  }
</script>

<template>
  <div></div>
</template>
