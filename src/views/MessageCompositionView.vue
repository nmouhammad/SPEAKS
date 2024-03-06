<script>
  import ProgressBar from '@/components/ProgressBar.vue'

  // @vuese
  // @group Views
  // The MessageCompositionView is the root view containing all other elements of the message composition software
  export default {
    name: 'MessageCompositionView',
    components: {
      ProgressBar,
    }
  }
</script>

<script setup>
  import { useProgressStore } from '@/stores/ProgressStore'

  const progressStore = useProgressStore()
  const { nextStep } = progressStore
  const { previousStep } = progressStore
</script>

<template>
  <ProgressBar />
  <div class="d-flex justify-content-center mt-5">
    <button class="btn btn-secondary" @click="previousStep()">Back</button>
    <button class="btn btn-secondary" @click="nextStep()">Next</button>
  </div>
</template>

<style scoped></style>
