<script setup>
  import { ref, watch } from 'vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { storeToRefs } from 'pinia'
  import SubpointAdder from '@/components/SubpointAdder.vue'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore'
  import CenteringCol5 from '@/components/CenteringCol5.vue'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++
  const chapterProgressStore = useChapterProgressStore()
  const { currentChapterID, currentElementID } =
    storeToRefs(chapterProgressStore)
  const presentationPlanStore = usePresentationPlanStore()

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
  const texts3 = [
    'Sounds interesting!',
    'Before we start, can you please enter the research-ID (the animal) from the paper we gave to you?'
  ]

  const texts4 = ['Great, thank you! Now we can start 🚀']

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [3, 1, 1, 1, 2, 1, 1]
  const wantingToContinue = ref(true)

  function decideWhetherToContinue(decision, userInputSlot) {
    wantingToContinue.value = decision
    userInputSlot.stopWaiting()
  }

  /**
   * If the user clicks "No" when being asked whether they want to try the
   * application, we want to display a response message to this and then
   * stop the program (= set waiting to true). This watch watches for changes
   * in the currentChapterID and if it matches the ChapterID of the response
   * to the "No" checks whether the user chose no and if yes sets waiting.
   */
  watch(
    currentChapterID,
    () => {
      stopWhenUserClicksNo()
    },
    {
      immediate: true
    }
  )
  watch(
    wantingToContinue,
    () => {
      stopWhenUserClicksNo()
    },
    {
      immediate: true
    }
  )
  function stopWhenUserClicksNo() {
    // check whether the user chose "No" & the parrot responded to it
    if (currentChapterID.value >= 2 && wantingToContinue.value == false) {
      chapterProgressStore.setWaiting()
      // set the chapterID & elementID to the response of the parrot for choosing "No"
      // (this is needed in case the user chose yes first, then continued (so
      // currentChapterID might already be e.g. 3 or 4) and afterwards chose "No", then
      // we need to change the currentChapterID & currentElementID so that the messages
      // shown in e.g. chapter 3 or 4 vanish)
      currentChapterID.value = 2
      currentElementID.value = 0
    }
  }
  /**
   * Save the topic of the presentation / pitch in the presentationPlanStore
   * @param {String} topic
   */
  function addTopic(topic) {
    presentationPlanStore.addTopic(topic)
    chapterProgressStore.unsetWaiting()
  }

  /**
   * Save the research-ID of the participant in the presentationPlanStore
   * @param {String} researchID
   */
  function addResearchID(researchID) {
    presentationPlanStore.addResearchID(researchID)
    chapterProgressStore.unsetWaiting()
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
    <UserInput :chapter-i-d="3" :custom-button="true" heading="Your topic">
      <CenteringCol5>
        <SubpointAdder :keep-displaying-content="true" @add="addTopic" />
      </CenteringCol5>
    </UserInput>
    <TextBlocks :chapter-i-d="4" :texts="texts3" />

    <UserInput
      :chapter-i-d="5"
      :custom-button="true"
      heading="Your research-ID (animal)"
    >
      <CenteringCol5>
        <SubpointAdder :keep-displaying-content="true" @add="addResearchID" />
      </CenteringCol5>
    </UserInput>

    <TextBlocks :chapter-i-d="6" :texts="texts4" />
  </ChatInterface>
</template>
