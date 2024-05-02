<script>
  /**
   * In this view, the user composes the middle part of their presentation.
   */
  export default {
    name: 'MiddleView'
  }
</script>

<script setup>
  import { storeToRefs } from 'pinia'

  import ContentBox from '@/components/ContentBox.vue'
  import ContentCollector from '@/components/ContentCollector.vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import CenteringCol5 from '@/components/CenteringCol5.vue'
  import UserInput from '@/components/UserInput.vue'

  import { useAudienceStore } from '@/stores/MC/AudienceStore'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++

  const audienceStore = useAudienceStore()
  const { knowledgeEnd, knowledgeBeginning } = storeToRefs(audienceStore)
  const presentationPlanStore = usePresentationPlanStore()
  const { middleContent } = storeToRefs(presentationPlanStore)

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const texts1 = [
    "We have the introduction to get the audience's interest and an end to summarize our main findings. Now it's time to create the middle part of the introduction.",
    "For this, we'll look at what our audience knows before our presentation..."
  ]
  const texts2 = ['... and what they should know afterwards.']
  const texts3 = [
    'How can we move them from what they know before to what they should know afterwards?',
    "<p>In my presentation I would roughly do that by addressing the following points: </p> <i> - parrots are intelligent & social <br> - they not only mimick human speech but use it for communication <br> - they do this because they want to be part of your social group <br> - teaching them to speak is like teaching a child to speak <br> - it's not only about teaching new words but also about bonding with each other <br> - communicate much, but use few and simple words <br> - show empathy, speak with emotion - the goal is to create a bond <br> - overpronounce words <br> - be patient <br> - make the parrot feel loved</i>"
  ]

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [2, 1, 1, 1, 2, 1]
</script>

<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="Middle"
  >
    <TextBlocks :chapter-i-d="0" :texts="texts1" />
    <!-- Previous knowledge of the audience -->
    <UserInput
      :chapter-i-d="1"
      heading="Recap your audience's previous knowledge"
      :custom-button="true"
      :no-waiting="true"
      ><CenteringCol5>
        <ContentBox
          :content-elements="knowledgeBeginning"
          :has-remove-option="false"
          content-box-heading="Your audience's knowledge before your presentation"
        />
      </CenteringCol5>
    </UserInput>
    <TextBlocks :chapter-i-d="2" :texts="texts2" />
    <!-- Gained knowledge of the audience -->
    <UserInput
      :chapter-i-d="3"
      heading="Recap your audience's gained knowledge"
      :custom-button="true"
      :no-waiting="true"
      ><CenteringCol5>
        <ContentBox
          :content-elements="knowledgeEnd"
          :has-remove-option="false"
          content-box-heading="Your audience's knowledge after your presentation"
        />
      </CenteringCol5>
    </UserInput>
    <TextBlocks :chapter-i-d="4" :texts="texts3" />
    <!-- Content of your middle part -->
    <UserInput
      :chapter-i-d="5"
      heading="Compose the content of your middle part"
      button-text="I'm done"
      ><CenteringCol5>
        <ContentCollector
          :all-content-to-display="middleContent"
          content-box-heading="Content of your middle part"
          @add="presentationPlanStore.addMiddleContent"
          @remove="presentationPlanStore.removeFromMiddleContent"
        />
      </CenteringCol5>
    </UserInput>
  </ChatInterface>
</template>
