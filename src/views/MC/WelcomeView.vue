<script setup>
  import { ref } from 'vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const texts1 = [
    'Did you ever wonder what makes some presentations outstanding while others are so boring that everyone just wants to leave?',
    'We did.',
    'We read tons of literature, interviewed experts and did research on the topic. Then we took the gist of all this and created "Presentable" to help others to create great presentations.',
    'Do you want to try it?'
  ]

  const texts2 = {
    false: [
      'Sorry to see you go. But we understand that becoming a great presenter might not be a goal for everyone 👋'
    ],
    true: [
      "Let's start! 💪 What will be the topic of your presentation / pitch?"
    ]
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [3, 1, 1]
  const wantingToContinue = ref(false)

  function decideWhetherToContinue(decision, userInputSlot) {
    wantingToContinue.value = decision
    userInputSlot.stopWaiting()
  }
</script>
<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="Welcome"
  >
    <TextBlocks :chapter-i-d="0" :texts="texts1" />
    <UserInput
      v-slot="userInputSlot"
      :chapter-i-d="1"
      :custom-button="true"
      :no-heading="true"
    >
      <button
        class="btn btn-outline-primary m-1"
        @click="decideWhetherToContinue(true, userInputSlot)"
      >
        Yes
      </button>
      <button
        class="btn btn-outline-primary m-1"
        @click="decideWhetherToContinue(false, userInputSlot)"
      >
        No
      </button>
    </UserInput>
    <TextBlocks :chapter-i-d="2" :texts="texts2[wantingToContinue]" />
  </ChatInterface>
</template>
