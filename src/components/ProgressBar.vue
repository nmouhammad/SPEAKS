<script setup>
  import { useProgressStore } from '@/stores/MC/ProgressStore'

  const store = useProgressStore()
  const { stepsToShowInProgressBar } = storeToRefs(store)
</script>

<script>
  import ProgressBarArrow from './ProgressBarArrow.vue'
  import { storeToRefs } from 'pinia'

  // @vuese
  // @group Components
  // The progress indicator on top showing users which step of the message composition they are in.
  export default {
    name: 'ProgressBar',
    components: { ProgressBarArrow }
  }
</script>

<template>
  <div class="d-flex justify-content-evenly">
    <div
      v-for="(step, index) in stepsToShowInProgressBar"
      :key="index"
      class="col-md-1"
    >
      <ProgressBarArrow
        :key="index"
        :abbreviation="step.abbreviation"
        :is-current="store.isCurrent(index + 1)"
        :is-shown="step.hasBeenVisited"
      />
    </div>
  </div>
</template>

<style scoped></style>
