<script setup>
  import { watch } from 'vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    /**
     * The ID of the chapter of this block.
     */
    chapterID: {
      type: Number,
      required: true
    },
    /**
     * The heading that should be shown on top of this block
     */
    heading: {
      type: String,
      required: true
    },
    /**
     * The text of the button the user should click when they are done with the
     * task in this block.
     */
    buttonText: {
      type: String,
      required: true
    }
  })

  const chapterProgressStore = useChapterProgressStore()
  const { currentChapterID } = storeToRefs(chapterProgressStore)

  /**
   * When this chapter starts (currentChapterID = props.chapterID), we need to set
   * waiting in the chapterProgressStore so that when the user presses one of the
   * keys normally triggering "next" (e.g. the right arrow) while e.g. editing the
   * content of their presentation, the next step will not be (wrongly) displayed.
   */
  watch(
    () => currentChapterID.value,
    (newChapterID) => {
      if (
        typeof newChapterID !== 'undefined' &&
        typeof props.chapterID !== 'undefined' &&
        newChapterID == props.chapterID
      ) {
        chapterProgressStore.setWaiting()
      }
    },
    {
      immediate: true
    }
  )

  /**
   * Deactivate the waiting, meaning that the next step is uncovered and that the
   * keys triggering "next" (e.g. right arrow) are leading to the next step being
   * uncovered again since the user is done with working on this block.
   */
  function stopWaiting() {
    chapterProgressStore.unsetWaiting()
  }
</script>
<template>
  <div v-show="currentChapterID >= props.chapterID" class="text-center">
    <h1>{{ props.heading }}</h1>
    <!-- @slot The user input to display (between the heading and the button) -->
    <slot></slot>
    <button class="btn btn-primary" @click="stopWaiting">
      {{ props.buttonText }}
    </button>
  </div>
</template>
