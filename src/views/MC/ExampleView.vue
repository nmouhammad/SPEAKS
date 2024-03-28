<script setup>
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  const texts = [
    {
      text: 't1',
      id: 0
    },
    { text: 't2', id: 1 }
  ]
  const texts2 = [
    {
      text: 't 1.2',
      id: 0
    },
    { text: 't2.2', id: 1 }
  ]

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
