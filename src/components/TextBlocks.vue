<script setup>
  import { computed } from 'vue'
  import SpeechBubble from './SpeechBubble.vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { storeToRefs } from 'pinia'

  const props = defineProps({
    /**
     * Array containing one object for each text message. Each object should have
     * the attributes "text" (String) and "id" (Number).
     */
    texts: {
      type: Array,
      required: true
    },
    /**
     * The ID for this chapter.
     */
    chapterID: {
      type: Number,
      required: true
    }
  })

  const chapterProgressStore = useChapterProgressStore()
  const { currentChapterID, currentElementID } =
    storeToRefs(chapterProgressStore)

  /**
   * Return all text messages that should be shown except the last
   * one (because the last one will be displayed differently than
   * the others)
   */
  const shownTextsExceptLast = computed(() => {
    if (currentChapterID.value == props.chapterID) {
      let texts = props.texts.filter(
        (textObject) => textObject.id < currentElementID.value
      )
      return texts
    } else {
      return props.texts.slice(0, -1)
    }
  })

  /**
   * Return the last text message that should be shown.
   */
  const lastText = computed(() => {
    if (currentChapterID.value == props.chapterID) {
      return props.texts.find(
        (textObject) => textObject.id == currentElementID.value
      )
    } else {
      return props.texts.slice(-1)[0]
    }
  })
</script>

<template>
  <div v-show="currentChapterID >= props.chapterID">
    <!-- Chat messages except the last one (no parrot and no triangle on speech bubble) -->
    <div
      v-for="currentText in shownTextsExceptLast"
      :key="currentText.id"
      class="row justify-content-md-center"
    >
      <div class="col-1 justify-content-end align-self-end"></div>
      <div class="col-md-5 justify-content-start overflow-auto">
        <SpeechBubble :key="currentText.id" :show-triangle="false">
          {{ currentText.text }}
        </SpeechBubble>
      </div>
    </div>

    <!-- Last chat message (with parrot and triangle on speech bubble) -->
    <div class="row justify-content-md-center">
      <div class="col-1 text-end align-self-top mt-2-5">
        <img src="@\assets\parrot.png" height="60px" />
      </div>
      <div
        class="col-md-5 justify-content-start overflow-auto align-self-center"
      >
        <SpeechBubble :key="lastText.id" :show-triangle="true">
          {{ lastText.text }}
        </SpeechBubble>
      </div>
    </div>
  </div>
</template>

<style scoped>
  /* mt-2 seemed to small and mt-3 too large; mt-2-5 is in the middle of mt-2 and mt-3 */
  .mt-2-5 {
    margin-top: 0.75rem !important;
  }
</style>
