<script setup>
  import KeyboardListener from '@/components/KeyboardListener.vue'

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

  // we define currentElementID & currentChapterID as v-models so that their
  // values are automatically synced with the parent (without the needs) for
  // emits etc.
  const currentElementID = defineModel('currentElementID', {
    type: Number,
    default: 0
  })
  const currentChapterID = defineModel('currentChapterID', {
    type: Number,
    default: 0
  })
  /**
   * Adapt currentElementID and currentChapterID so that the next element
   * is shown (if there is any)
   */
  function next() {
    if (
      currentElementID.value <
      props.nrOfElementsInChapter[currentChapterID.value] - 1
    ) {
      currentElementID.value++
    } else if (
      currentChapterID.value <
      props.nrOfElementsInChapter.length - 1
    ) {
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
      currentElementID.value =
        props.nrOfElementsInChapter[currentChapterID.value] - 1
      currentChapterID.value--
    }
  }
</script>

<template><KeyboardListener @next="next" @previous="previous" /></template>
