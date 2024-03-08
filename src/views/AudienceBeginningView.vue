<script>
  import ContentCollector from '@/components/ContentCollector.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the beginning of the presentation
  export default {
    name: 'AudienceBeginningView',
    components: { ContentCollector }
  }
</script>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const { knowledgeBeginning } = storeToRefs(store)
</script>

<template>
  <h5>What does your audience already know about your topic?</h5>
  <ContentCollector
    :all-content-to-display="knowledgeBeginning"
    content-box-heading="Previous knowledge of your audience"
    @add="store.addToknowledgeBeginning"
    @remove="store.removeFromKnowledgeBeginning"
  />
</template>

<style scoped></style>
