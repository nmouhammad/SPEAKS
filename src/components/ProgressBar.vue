<script setup>
  import { useProgressStore } from '@/stores/ProgressStore'

  const store = useProgressStore()
  const { steps } = storeToRefs(store)
  const { nextStep } = store
  const { previousStep } = store
</script>

<script>
  import ProgressBarCircle from './ProgressBarCircle.vue'
  import { storeToRefs } from 'pinia'

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
      <div v-for="(step, index) in steps" :key="index" class="mt-1 col-md-1">
        <ProgressBarCircle
          :key="index"
          :abbreviation="step.abbreviation"
          :isCurrent="store.isCurrent(index)"
        />
      </div>
    </div>
  </div>
  <button class="btn btn-secondary" @click="previousStep()">Back</button>
  <button class="btn btn-secondary" @click="nextStep()">Next</button>
</template>

<style scoped></style>
