<script>
  import ProgressBar from '@/components/ProgressBar.vue'

  // @vuese
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
</script>

<template>
  <ProgressBar />
</template>

<style scoped></style>
