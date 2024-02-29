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
      }
    }
  }
</script>

<template>
  <button class="btn btn-primary">{{ abbreviation }}</button>
</template>

<style scoped></style>
