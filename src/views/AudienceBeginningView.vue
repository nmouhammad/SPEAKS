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
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/AudienceStore'

  const store = useAudienceStore()
  const content = ref('')
  const knowledgeToRemove = ref('')
  const { knowledgeBeginning } = storeToRefs(store)
</script>

<template>
  <div>
    <p>What does your audience already know about your topic?</p>
    <ContentBox
      :content-elements="knowledgeBeginning"
      :to-remove="knowledgeToRemove"
      @remove="store.removeFromKnowledgeBeginning"
    />
    <SubpointAdder :content="content" @add="store.addToknowledgeBeginning" />
  </div>
</template>

<style scoped></style>
