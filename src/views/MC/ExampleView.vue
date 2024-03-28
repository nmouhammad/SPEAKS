<script setup>
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  const texts = ['t1', 't2']
  const texts2 = ['t 1.2', 't2.2']

  const nrOfElementsInChapter = [2, 1, 2]
</script>

<template>
  <ChatInterface :nr-of-elements-in-chapter="nrOfElementsInChapter">
    <TextBlocks :chapter-i-d="0" :texts="texts" />
    <UserInput :chapter-i-d="1" heading="heading" button-text="next">
      <p>Test</p>
    </UserInput>
    <TextBlocks :chapter-i-d="2" :texts="texts2" />
  </ChatInterface>
</template>
