<script>
  import ContentCollector from '@/components/ContentCollector.vue'
  import CenteringContainer from '@/components/CenteringContainer.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the beginning of the presentation
  export default {
    name: 'AudienceBeginningView',
    components: { ContentCollector, CenteringContainer }
  }
</script>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const { knowledgeBeginning } = storeToRefs(store)
</script>

<template>
  <CenteringContainer>
    <h5 class="text-center">
      What does your audience already know about your topic?
    </h5>
    <ContentCollector
      :all-content-to-display="knowledgeBeginning"
      content-box-heading="Previous knowledge of your audience"
      @add="store.addToknowledgeBeginning"
      @remove="store.removeFromKnowledgeBeginning"
    />
  </CenteringContainer>
</template>

<style scoped></style>
