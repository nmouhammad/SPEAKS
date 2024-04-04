<script setup>
  import KeyboardListener from '@/components/KeyboardListener.vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { scrollToBottomAfterUpdate } from '@/composables/scrollToBottomAfterUpdate.js'

  /**
   * If you have a setup with chapters + subelements, this component will handle
   * automatically the increase and decrease of element & chapter ids when the
   * corresponding keys are pressed
   */
  const props = defineProps({
    /**
     * Array containing one Number for each chapter, this Number represents the length of the chapter (= nr of subelements)
     */
    nrOfElementsInChapter: {
      type: Array,
      required: true
    },
    /**
     * The abbreviation of the step in which this component is used
     */
    stepAbbreviation: {
      type: String,
      required: true
    }
  })

  const chapterProgressStore = useChapterProgressStore()
  chapterProgressStore.init(props.nrOfElementsInChapter, props.stepAbbreviation)

  /**
   * Adapt currentElementID and currentChapterID so that the next element
   * is shown (if there is any)
   */
  function next() {
    chapterProgressStore.next()
    // Wait for DOM to update and then scroll to bottom
    scrollToBottomAfterUpdate()
  }

  /**
   * Adapt currentElementID and currentChapterID so that the last shown element
   * is hidden again (if there is any)
   */
  function previous() {
    chapterProgressStore.previous()
  }
</script>

<template>
  <div class="mb-5">
    <KeyboardListener @next="next" @previous="previous" />
    <!-- @slot content elements that will be managed by this ChatInterface -->
    <slot></slot>
  </div>
</template>
