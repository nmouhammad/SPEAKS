<script setup>
  /**
   * This view contains all elements regarding the analysis of the audience
   * in the beginning of the presentation.
   */
  import ContentCollector from '@/components/ContentCollector.vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/MC/AudienceStore'

  const store = useAudienceStore()
  const { knowledgeBeginning } = storeToRefs(store)

  const texts1 = [
    "Experts told us that it is really important for effective presentations to first consider the audience of the presentation. So that's what we will do now.",
    'What does your audience already know about your topic?'
  ]
  const nrOfElementsInChapter = [2, 1]
</script>

<template>
  <ChatInterface :nr-of-elements-in-chapter="nrOfElementsInChapter">
    <TextBlocks :chapter-i-d="0" :texts="texts1" />

    <UserInput
      :chapter-i-d="1"
      heading="Collecting the audience's previous knowledge"
      button-text="I'm done"
    >
      <div class="row justify-content-md-center">
        <div class="col-5">
          <ContentCollector
            :all-content-to-display="knowledgeBeginning"
            content-box-heading="Previous knowledge of your audience"
            @add="store.addToknowledgeBeginning"
            @remove="store.removeFromKnowledgeBeginning"
          />
        </div>
      </div>
    </UserInput>
  </ChatInterface>
</template>

<style scoped></style>
