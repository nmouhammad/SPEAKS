<script>
  /**
   * In this view, the user composes the middle part of their presentation.
   */
  export default {
    name: 'MiddleView'
  }
</script>

<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import ChapterStepsHandler from '@/components/ChapterStepsHandler.vue'
  import ThreePanes from '@/components/ThreePanes.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import ContentCollector from '@/components/ContentCollector.vue'

  import { useAudienceStore } from '@/stores/AudienceStore'
  import { usePresentationPlanStore } from '@/stores/PresentationPlanStore'

  const audienceStore = useAudienceStore()
  const { knowledgeEnd, knowledgeBeginning } = storeToRefs(audienceStore)
  const presentationPlanStore = usePresentationPlanStore()
  const { middleContent } = storeToRefs(presentationPlanStore)

  // ++++ Counters for which elements to show ++++

  // all elements in one chapter are shown after each other, when the next
  // chapter begins, the content of the previous chapter is deleted

  // id of the last element in the current chapter that is shown
  const currentElementID = ref(0)
  const currentChapterID = ref(0)
  // since not all chapters have the same length, we need to save the
  // length of each chapter
  const nrOfElementsInChapter = [5, 5]

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
  <ChapterStepsHandler
    v-model:current-element-i-d="currentElementID"
    v-model:current-chapter-i-d="currentChapterID"
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
  />
  <ThreePanes>
    <template #left-pane>
      <ContentBox
        v-if="isElementShown(2, 0) || isElementShown(0, 1)"
        :content-elements="knowledgeBeginning"
        :has-remove-option="false"
        content-box-heading="Your audience's knowledge before your presentation"
      ></ContentBox>
    </template>
    <template #middle-pane>
      <p v-if="isElementShown(0, 0)" class="text-center">
        We have the introduction to get the audience's interest and an end to
        summarize our main findings. Now it's time to create the middle part of
        the introduction.
      </p>
      <p v-if="isElementShown(1, 0)" class="text-center">
        For this, we'll look at what our audience knows before our
        presentation...
      </p>
      <p v-if="isElementShown(3, 0)" class="text-center">
        ... and what they should know afterwards.
      </p>
      <p
        v-if="isElementShown(5, 0) || isElementShown(0, 1)"
        class="text-center"
      >
        How can we move them from the left to the right?
      </p>
      <div
        v-if="isElementShown(1, 1)"
        class="d-flex flex-column align-items-center gap-3"
      >
        <ContentCollector
          class="gap-3"
          :all-content-to-display="middleContent"
          content-box-heading="Content of your middle part"
          @add="presentationPlanStore.addMiddleContent"
          @remove="presentationPlanStore.removeFromMiddleContent"
        />
      </div>
    </template>
    <template #right-pane>
      <ContentBox
        v-if="isElementShown(4, 0) || isElementShown(0, 1)"
        :content-elements="knowledgeEnd"
        :has-remove-option="false"
        content-box-heading="Your audience's knowledge after your presentation"
      ></ContentBox>
    </template>
  </ThreePanes>
</template>
