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
      },
      // True if this step should already be visible
      isShown: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<script setup>
  import { useProgressStore } from '@/stores/ProgressStore'
  const store = useProgressStore()
</script>

<template>
  <button
    class="btn"
    :class="[isCurrent ? 'btn-primary' : 'btn-outline-primary']"
    v-show="isShown"
    @click="store.changeStep(abbreviation)"
  >
    {{ abbreviation }}
  </button>
</template>

<style scoped></style>
