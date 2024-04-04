<script setup>
  /**
   * This view contains all elements regarding the analysis of the audience in the end of the presentation.
   */
  import { storeToRefs } from 'pinia'
  import { useAudienceStore } from '@/stores/MC/AudienceStore'
  import ContentCollector from '@/components/ContentCollector.vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import CenteringCol5 from '@/components/CenteringCol5.vue'

  const store = useAudienceStore()
  const { knowledgeEnd } = storeToRefs(store)

  const texts1 = [
    "Great, now that we know what your audience already knows, we'll jump to after you gave the presentation to think about what you want your audience to know after your presentation."
  ]
  const nrOfElementsInChapter = [1, 1]
</script>

<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="After"
  >
    <TextBlocks :chapter-i-d="0" :texts="texts1" />
    <UserInput
      :chapter-i-d="1"
      heading="What should your audience know about your topic after your presentation?"
      button-text="I'm done"
    >
      <CenteringCol5>
        <ContentCollector
          :all-content-to-display="knowledgeEnd"
          content-box-heading="Gained knowledge of your audience:"
          @add="store.addToknowledgeEnd"
          @remove="store.removeFromKnowledgeEnd"
        />
      </CenteringCol5>
    </UserInput>
  </ChatInterface>
</template>
