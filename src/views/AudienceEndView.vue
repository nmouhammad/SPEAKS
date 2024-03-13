<script>
  import ContentCollector from '@/components/ContentCollector.vue'
  import CenteringContainer from '@/components/CenteringContainer.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the end of the presentation
  export default {
    name: 'AudienceEndView',
    components: { ContentCollector, CenteringContainer }
  }
</script>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const { knowledgeEnd } = storeToRefs(store)
</script>

<template>
  <CenteringContainer>
    <h5 class="text-center">
      What should your audience know about your topic after your presentation?
    </h5>
    <ContentCollector
      :all-content-to-display="knowledgeEnd"
      content-box-heading="Gained knowledge of your audience:"
      @add="store.addToknowledgeEnd"
      @remove="store.removeFromKnowledgeEnd"
    />
  </CenteringContainer>
</template>

<style scoped></style>
