<script>
  import SubpointAdder from '@/components/SubpointAdder.vue'
  import ContentBox from '@/components/ContentBox.vue'
  // @vuese
  // @group Views
  // This view contains all elements regarding the analysis of the audience in the beginning of the presentation
  export default {
    name: 'AudienceBeginningView',
    components: { SubpointAdder, ContentBox }
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
  <ContentBox
    :content-elements="knowledgeBeginning"
    @remove="store.removeFromKnowledgeBeginning"
  />
</template>

<style scoped></style>
