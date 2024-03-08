<script setup>
  import { useProgressStore } from '@/stores/ProgressStore'

  const store = useProgressStore()
  const { steps } = storeToRefs(store)
</script>

<script>
  import ProgressBarCircle from './ProgressBarCircle.vue'
  import { storeToRefs } from 'pinia'

  // @vuese
  // @group Components
  // The progress indicator on top showing users which step of the message composition they are in.
  export default {
    name: 'ProgressBar',
    components: { ProgressBarCircle }
  }
</script>

<template>
  <div class="d-flex justify-content-evenly">
    <div v-for="(step, index) in steps" :key="index" class="mt-1 col-md-1">
      <ProgressBarCircle
        :key="index"
        :abbreviation="step.abbreviation"
        :is-current="store.isCurrent(index)"
        :is-shown="step.hasBeenVisited"
      />
    </div>
  </div>
</template>

<style scoped></style>
