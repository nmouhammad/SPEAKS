<script setup>
  import { ref } from 'vue'

  const steps = ref([
    { name: 'Audience-Beginning', abbreviation: 'AB' },
    { name: 'Introduction', abbreviation: 'I' },
    { name: 'Main-1', abbreviation: '1' },
    { name: 'Main-2', abbreviation: '2' },
    { name: 'Main-3', abbreviation: '3' },
    { name: 'End', abbreviation: 'E' },
    { name: 'Audience-End', abbreviation: 'AE' }
  ])
</script>

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
  <div class="container">
    <div class="row align-items-center">
      <div v-for="step in steps" :key="step.id" class="mt-1 col-md-1">
        <ProgressBarCircle :key="step.id" :abbreviation="step.abbreviation" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
