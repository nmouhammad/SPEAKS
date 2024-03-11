<script>
  import SubstepsViewer from '@/components/SubstepsViewer.vue'

  // @vuese
  // @group Views
  // This view guides the user through creating the introduction
  export default {
    name: 'IntroductionView',
    components: {
      SubstepsViewer
    }
  }
</script>
<script setup>
  import { ref } from 'vue'

  const textArray = ['text 1', 'text 2', 'text 3']
  const currentTextID = ref(0)

  /**
   * Increases the currentTextID if possible
   */
  function increaseTextID() {
    if (currentTextID.value < textArray.length - 1) {
      currentTextID.value++
    }
  }
  /**
   * Decreases the currentTextID if possible
   */
  function decreaseTextID() {
    if (currentTextID.value > 0) {
      currentTextID.value--
    }
  }

  /**
   * Checks whether there is a next step based on textArray
   */
  function nextIsPossible() {
    return currentTextID.value < textArray.length - 1
  }
  /**
   * Checks whether there is a previous step based on textArray
   */
  function previousIsPossible() {
    return currentTextID.value > 0
  }
</script>

<template>
  <p>Introduction</p>
  <SubstepsViewer
    :text="textArray[currentTextID]"
    :next-is-possible="nextIsPossible()"
    :previous-is-possible="previousIsPossible()"
    @next="increaseTextID"
    @previous="decreaseTextID"
  />
</template>
