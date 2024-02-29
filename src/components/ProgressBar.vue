<script>
  import ProgressBarCircle from './ProgressBarCircle.vue'

  // @vuese
  // The progress indicator on top showing users which step of the message composition they are in.
  export default {
    name: 'ProgressBar',
    components: { ProgressBarCircle }
  }
</script>

<template>
  <div>
    <ProgressBarCircle />
  </div>
</template>

<style scoped></style>
