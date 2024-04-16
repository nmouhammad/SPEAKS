<script>
  /**
   * In this view, the user composes the end of their presentation.
   */
  export default {
    name: 'EndView'
  }
</script>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import ContentCollector from '@/components/ContentCollector.vue'
  import CenteringCol5 from '@/components/CenteringCol5.vue'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore'
  import { useAudienceStore } from '@/stores/MC/AudienceStore'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++

  const presentationPlanStore = usePresentationPlanStore()
  const { endContent } = storeToRefs(presentationPlanStore)

  const audienceStore = useAudienceStore()
  const { knowledgeEnd } = storeToRefs(audienceStore)

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const texts1 = [
    'Great, the first and probably most important part of your presentation is done! 🎉',
    "Now we'll create the end for your presentation.",
    'During the end, we should close any brackets that we opened during the introduction.',
    "Let's look at the introduction again and check if there are any open brackets."
  ]

  const texts2 = [
    'If there are any open brackets, you can note down below how to close them in the end'
  ]

  const texts3 = [
    "Before we compose the rest of the end of your presentation, let's look at where you wanted your audience to be after your presentation again."
  ]

  const texts4 = [
    'This is your main message. The conclusion is a good point to repeat your main message shortly & concisely again, so it sticks into the audience‘s head.',
    'How do you want to end your presentation?'
  ]

  // ++++ Counters for which elements to show ++++

  // all elements in one chapter are shown after each other, when the next
  // chapter begins, the content of the previous chapter is deleted

  // id of the last element in the current chapter that is shown
  const currentElementID = ref(0)
  const currentChapterID = ref(0)
  // since not all chapters have the same length, we need to save the
  // length of each chapter
  const nrOfElementsInChapter = [4, 1, 1, 1, 1, 1, 2, 1]

  /**
   * Returns true if the element with the given elementID and chapterID should be visible
   */
  function isElementShown(elementID, chapterID) {
    return (
      currentChapterID.value == chapterID && elementID <= currentElementID.value
    )
  }
</script>

<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="End"
  >
    <TextBlocks :chapter-i-d="0" :texts="texts1" />
    <UserInput
      :chapter-i-d="1"
      heading="Recap your introduction plan"
      :custom-button="true"
      :no-waiting="true"
    >
      <CenteringCol5>
        <ContentBox
          :content-elements="presentationPlanStore.introductionContent"
          :has-remove-option="false"
          content-box-heading="Your introduction plan"
        >
          3"></ContentBox
        ></CenteringCol5
      >
    </UserInput>
    <TextBlocks :chapter-i-d="2" :texts="texts2" />
    <UserInput
      :chapter-i-d="3"
      heading="Close open brackets in the end"
      button-text="I'm done"
    >
      <CenteringCol5>
        <ContentCollector
          :all-content-to-display="endContent"
          content-box-heading="Closing open brackets in the end"
          @add="presentationPlanStore.addEndContent"
          @remove="presentationPlanStore.removeFromEndContent"
        />
      </CenteringCol5>
    </UserInput>
    <TextBlocks :chapter-i-d="4" :texts="texts3" />
    <UserInput
      :chapter-i-d="5"
      heading="Recap what your audience should learn"
      button-text="I'm done"
      ><CenteringCol5>
        <ContentBox
          :content-elements="knowledgeEnd"
          :has-remove-option="false"
          content-box-heading="What your audience should learn"
        />
      </CenteringCol5>
    </UserInput>
    <TextBlocks :chapter-i-d="6" :texts="texts4" />
    <UserInput
      :chapter-i-d="7"
      heading="Recap what your audience should learn"
      button-text="I'm done"
    >
      <CenteringCol5>
        <ContentCollector
          :all-content-to-display="endContent"
          content-box-heading="End of your presentation"
          @add="presentationPlanStore.addEndContent"
          @remove="presentationPlanStore.removeFromEndContent"
      /></CenteringCol5>
    </UserInput>
  </ChatInterface>
</template>
