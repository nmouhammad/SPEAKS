<script>
  import SubpointAdder from '@/components/SubpointAdder.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the beginning of the presentation
  export default {
    name: 'AudienceBeginningView',
    components: { SubpointAdder }
  }
</script>

<script setup>
  import { ref } from 'vue'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const content = ref('')
</script>

<template>
  <div>
    <p>What does your audience already know about your topic?</p>
    <SubpointAdder :content="content" @add="store.addToknowledgeBeginning" />
  </div>
</template>

<style scoped></style>
