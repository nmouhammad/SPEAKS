<script>
  import ContentCollector from '@/components/ContentCollector.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the end of the presentation
  export default {
    name: 'AudienceEndView',
    components: { ContentCollector }
  }
</script>

<script setup>
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const { knowledgeEnd } = storeToRefs(store)
</script>

<template>
  <h5 class="text-center">
    What should your audience know about your topic after your presentation?
  </h5>
  <ContentCollector
    :all-content-to-display="knowledgeEnd"
    content-box-heading="Gained knowledge of your audience:"
    @add="store.addToknowledgeEnd"
    @remove="store.removeFromKnowledgeEnd"
  />
</template>

<style scoped></style>
