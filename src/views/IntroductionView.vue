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

  const subtextArray = [
    ['text 1.1', 'text 1.2', 'text 1.3'],
    ['text 2.1', 'text 2.2', 'text 2.3'],
    ['text 3.1', 'text 3.2', 'text 3.3']
  ]
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
</script>

<template>
  <p>Introduction</p>
  <SubstepsViewer
    :texts="subtextArray"
    @next="increaseTextID"
    @previous="decreaseTextID"
  />
</template>
