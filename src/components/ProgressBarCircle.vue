<script>
  // @vuese
  // One of the circles representing one step in the ProgressBar.
  export default {
    name: 'ProgressBarCircle',
    props: {
      // Abbreviation of the step title (should be <=2 letters) that will be displayed inside the circle
      abbreviation: {
        type: String,
        required: true
      },
      // True, if this step is the current step, false otherwise
      isCurrent: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<template>
  <button
    class="btn"
    :class="[isCurrent ? 'btn-primary' : 'btn-outline-primary']"
  >
    {{ abbreviation }}
  </button>
</template>

<style scoped></style>
