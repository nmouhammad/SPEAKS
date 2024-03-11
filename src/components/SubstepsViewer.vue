<script>
  import KeyboardListener from '@/components/KeyboardListener.vue'

  // @vuese
  // @group Components
  // If one view (e.g. Introduction) has different substeps, this component can be used
  // to display one of the substeps at a time
  export default {
    components: {
      KeyboardListener
    },
    props: {
      // the text that should be displayed
      text: {
        type: String,
        required: true
      },
      // whether there currently is a next possible step = whether the next button
      // should be activated
      nextIsPossible: {
        type: Boolean,
        required: true
      },
      // whether there currently is a previous possible step = whether the previous
      // button should be activated
      previousIsPossible: {
        type: Boolean,
        required: true
      }
    },
    emits: ['next', 'previous'],
    methods: {
      keydownEvent(event) {
        // if any of the following keys is pressed, 'next' should be emitted
        const keysTriggeringNext = ['ArrowRight', 'Enter', ' ']
        // if any of the following keys is pressed, 'previous' should be emitted
        const keysTriggeringPrevious = ['ArrowLeft']
        const pressedKey = event.key

        // check whether the pressedKey is in the array keysTriggeringNext
        if (keysTriggeringNext.indexOf(pressedKey) !== -1) {
          this.$emit('next')
        }
        // check whether the pressedKey is in the array keysTriggeringPrevious
        if (keysTriggeringPrevious.indexOf(pressedKey) !== -1) {
          this.$emit('previous')
        }
      }
    }
  }
</script>

<template>
  <!-- Changing the substep -->
  <KeyboardListener @keydown="keydownEvent" />
  <div class="btn-group">
    <!-- Chevron left -->
    <button
      class="btn btn-outline-secondary"
      :disabled="!previousIsPossible"
      @click="$emit('previous')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
        />
      </svg>
    </button>
    <!-- Chevron right -->
    <button
      class="btn btn-outline-secondary"
      :disabled="!nextIsPossible"
      @click="$emit('next')"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-chevron-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
        />
      </svg>
    </button>
  </div>
  <p>{{ text }}</p>
</template>
