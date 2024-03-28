<script setup>
  import KeyboardListener from '@/components/KeyboardListener.vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'

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
    }
  })

  const chapterProgressStore = useChapterProgressStore()
  chapterProgressStore.init(props.nrOfElementsInChapter)
  /**
   * Adapt currentElementID and currentChapterID so that the next element
   * is shown (if there is any)
   */
  function next() {
    chapterProgressStore.next()
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
  <KeyboardListener @next="next" @previous="previous" />
  <!-- @slot content elements that will be managed by this ChatInterface -->
  <slot></slot>
</template>
