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
    class="btn btn-lg"
    :class="[isCurrent ? 'btn-primary' : 'btn-outline-primary']"
    v-show="isShown"
    @click="store.changeStep(abbreviation)"
  >
    {{ abbreviation }}
  </button>
</template>

<style scoped>
  /* modified from https://bootsnipp.com/snippets/dKB */
  .btn-lg {
    text-align: center;
    width: 50px;
    height: 50px;
    padding: 10px 5px;
    font-size: 18px;
    line-height: 1.33;
    border-radius: 25px;
  }
</style>
