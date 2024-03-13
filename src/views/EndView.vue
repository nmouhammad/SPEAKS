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
  import KeyboardListener from '@/components/KeyboardListener.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import ContentCollector from '@/components/ContentCollector.vue'
  import { usePresentationPlanStore } from '@/stores/PresentationPlanStore'
  import { useAudienceStore } from '@/stores/AudienceStore'

  // ++++ Import stores ++++

  const presentationPlanStore = usePresentationPlanStore()
  const { endContent } = storeToRefs(presentationPlanStore)

  const audienceStore = useAudienceStore()
  const { knowledgeEnd } = storeToRefs(audienceStore)

  // ++++ Counters for which elements to show ++++

  // all elements in one chapter are shown after each other, when the next
  // chapter begins, the content of the previous chapter is deleted

  // id of the last element in the current chapter that is shown
  const currentElementID = ref(0)
  const currentChapterID = ref(0)
  // since not all chapters have the same length, we need to save the
  // length of each chapter
  const nrOfElementsInChapter = [7, 5]

  /**
   * Adapt currentElementID and currentChapterID so that the next element
   * is shown (if there is any)
   */
  function next() {
    if (
      currentElementID.value <
      nrOfElementsInChapter[currentChapterID.value] - 1
    ) {
      currentElementID.value++
    } else if (currentChapterID.value < nrOfElementsInChapter.length - 1) {
      currentChapterID.value++
      currentElementID.value = 0
    }
  }

  /**
   * Adapt currentElementID and currentChapterID so that the last shown element
   * is hidden again (if there is any)
   */
  function previous() {
    if (currentElementID.value > 0) {
      currentElementID.value--
    } else if (currentChapterID.value > 0) {
      currentElementID.value = nrOfElementsInChapter[currentChapterID.value] - 1
      currentChapterID.value--
    }
  }

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
  <KeyboardListener @next="next" @previous="previous" />

  <div class="container mt-5">
    <div class="row">
      <!-- We have a row with three equally sized columns, each column is used as one of the 
        panes where content will be shown step by step -->
      <div class="col-4 align-self-center">
        <!-- left pane -->
        <!-- CHAPTER 0 -->
        <ContentBox
          v-if="isElementShown(4, 0)"
          :content-elements="presentationPlanStore.introductionContent"
          :has-remove-option="false"
          content-box-heading="Your introduction plan"
        >
          3"></ContentBox
        >
      </div>
      <div class="col-4">
        <!-- middle pane -->
        <!-- CHAPTER 0 -->
        <p v-if="isElementShown(0, 0)" class="text-center">
          Great, the first and probably most important part of your presentation
          is done! 🎉
        </p>
        <p v-if="isElementShown(1, 0)" class="text-center">
          Now we'll create the end for your presentation.
        </p>
        <p v-if="isElementShown(2, 0)" class="text-center">
          During the end, we should close any brackets that we opened during the
          discussion.
        </p>
        <p v-if="isElementShown(3, 0)" class="text-center">
          Let's look at the discussion again and check if there are any open
          brackets.
        </p>
        <p v-if="isElementShown(5, 0)" class="text-center">
          If there are any open brackets, you can note down below how to close
          them in the end
        </p>
        <div
          v-if="isElementShown(6, 0)"
          class="d-flex flex-column align-items-center gap-3"
        >
          <ContentCollector
            class="gap-3"
            :all-content-to-display="endContent"
            content-box-heading="Closing open brackets in the end"
            @add="presentationPlanStore.addEndContent"
            @remove="presentationPlanStore.removeFromEndContent"
          />
        </div>

        <!-- CHAPTER 1 -->
        <p v-if="isElementShown(0, 1)" class="text-center">
          Before we compose the rest of the end of your presentation, let's look
          at where you wanted your audience to be after your presentation again.
        </p>
        <p v-if="isElementShown(2, 1)" class="text-center">
          This is your main message. The conclusion is a good point to repeat
          your main message shortly & concisely again, so it sticks into the
          audience‘s head.
        </p>
        <p v-if="isElementShown(3, 1)" class="text-center">
          How do you want to end your presentation?
        </p>
        <div
          v-if="isElementShown(4, 1)"
          class="d-flex flex-column align-items-center gap-3"
        >
          <ContentCollector
            class="gap-3"
            :all-content-to-display="endContent"
            content-box-heading="End of your presentation"
            @add="presentationPlanStore.addEndContent"
            @remove="presentationPlanStore.removeFromEndContent"
          />
        </div>
      </div>
      <div class="col-4 align-self-center">
        <!-- right pane -->
        <!-- CHAPTER 1 -->
        <ContentBox
          v-if="isElementShown(1, 1)"
          :content-elements="knowledgeEnd"
          :has-remove-option="false"
          content-box-heading="What your audience should learn"
        >
          3"></ContentBox
        >
      </div>
    </div>
  </div>
</template>
