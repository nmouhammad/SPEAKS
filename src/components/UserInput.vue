<script setup>
  import { watch } from 'vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { scrollToBottomAfterUpdate } from '@/composables/scrollToBottomAfterUpdate.js'
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
      default: ''
    },
    /**
     * Whether a custom button is added inside the slot instead of using the
     * standard button of UserInput.
     */
    customButton: {
      type: Boolean,
      default: false
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
    scrollToBottomAfterUpdate()
  }
</script>
<template>
  <div v-show="currentChapterID >= props.chapterID" class="text-center m-4">
    <div class="row justify-content-md-center">
      <h3 class="h5 mb-3 col-5">{{ props.heading }}</h3>
    </div>
    <!-- @slot The user input to display (between the heading and the (optional) button). If customButton is true, this slot should trigger stopWaiting when the next step should be shown. -->
    <slot :stop-waiting="stopWaiting"></slot>
    <button
      v-if="!props.customButton"
      class="btn btn-primary mt-3"
      @click="stopWaiting"
    >
      {{ props.buttonText }}
    </button>
  </div>
</template>
