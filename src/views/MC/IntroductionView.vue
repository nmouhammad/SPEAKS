<script setup>
  /**
   * This view guides the user through creating the introduction.
   */
  import { ref, watch } from 'vue'
  import { storeToRefs } from 'pinia'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import ContentCollector from '@/components/ContentCollector.vue'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { scrollToBottomAfterUpdate } from '@/composables/scrollToBottomAfterUpdate.js'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++

  const presentationPlanStore = usePresentationPlanStore()
  const { introductionContent } = storeToRefs(presentationPlanStore)

  const chapterProgressStore = useChapterProgressStore()
  const { currentChapterID, currentElementID } =
    storeToRefs(chapterProgressStore)

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  // text messages for the first text block
  const texts1 = [
    'Great, now that we know more about your audience and what you want to reach with your presentation, we can start with preparing the actual presentation!',
    "First, we'll make sure to interest your audience into your topic.",
    'A good chance for this is in your Introduction.',
    'Many people waste this chance by starting with "Hello my name is Presentable and today we talk about xyz. This is my schedule. First, we start with ..."',
    'See how everyone is already falling asleep or looking at their phones?',
    "Let's make sure this won't happen to you!",
    "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you and this presentation!"
  ]

  // Object containing the different options that users can choose for the introduction
  const introOptions = {
    story: {
      text: 'Tell a story',
      description: 'Telling a story is a good way ...',
      submitText: 'I want to start with a story',
      contentBoxText: 'Content of your story'
    },
    fact: {
      text: 'Tell an impressive fact',
      description: 'Starting with an impressive fact ..',
      submitText: 'I want to start with a fact',
      contentBoxText: 'Presentation of your fact'
    },
    question: {
      text: 'Ask a question',
      description: 'Asking your audience a question ...',
      submitText: 'I want to start with a question',
      contentBoxText: 'Presentation of your question'
    }
  }

  // the texts that will be shown after the introType has been chosen
  // HINT: if in the end one of these text-arrays has a different
  // number of elements than the other, the method that is called
  // when choosing the introType needs to adapt the nrOfElementsInChapter
  // in the store
  const texts2BasedOnIntroType = {
    story: ['Story 1', 'Story 2'],
    fact: ['Fact 1', 'Fact 2'],
    question: ['Question 1', 'Question 2']
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Provide functionality reg. the introType ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++

  // the intro type for which the description should be shown ("" if none)
  let chosenIntroType = ref('')

  // determine which description to show for the button used for confirming the
  // introType choice
  function showDescription(introType) {
    if (chosenIntroType.value.length > 0) {
      // if the chosen IntroType has already been set before, we need to
      // roll back the instructions to the point where the user
      // decides for an introType.
      currentChapterID.value = 1
      currentElementID.value = 0
    }

    chosenIntroType.value = introType
    scrollToBottomAfterUpdate()
  }

  function saveIntroTypeAndContinue(userInputSlot) {
    presentationPlanStore.setIntroductionType(chosenIntroType.value)
    userInputSlot.stopWaiting()
  }

  watch(() => presentationPlanStore.introductionType, reactToIntroTypeChange, {
    immediate: true
  })

  function reactToIntroTypeChange(newIntroType, oldIntroType) {
    // check whether the new introType is not empty
    // and different than the previous introType
    if (newIntroType.length > 0 && !(newIntroType === oldIntroType)) {
      // remove the old introductionContent
      presentationPlanStore.emptyIntroductionContent()
      chosenIntroType.value = newIntroType
    }
  }

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [7, 1, 2, 1]
</script>

<template>
  <ChatInterface :nr-of-elements-in-chapter="nrOfElementsInChapter">
    <TextBlocks :chapter-i-d="0" :texts="texts1" />
    <UserInput
      v-slot="userInputSlot"
      :chapter-i-d="1"
      heading="Pick your introduction type"
      :custom-button="true"
    >
      <!-- Buttons containing the choices -->
      <div class="d-flex flex-column justify-content-center gap-1">
        <div
          v-for="(currentElement, currentIntroType) in introOptions"
          :key="currentIntroType"
          class="text-center"
        >
          <button
            class="btn"
            :class="[
              chosenIntroType === currentIntroType
                ? 'btn-primary'
                : 'btn-outline-primary'
            ]"
            @click="showDescription(currentIntroType)"
          >
            {{ currentElement.text }}
          </button>
        </div>
      </div>

      <!-- Descriptions (shown after choosing one of the choice buttons) -->
      <p
        v-if="chosenIntroType.length > 0"
        class="fs-6 fw-light mt-3 text-center"
      >
        {{ introOptions[chosenIntroType].description }}
      </p>

      <!-- Button to confirm the introType choice -->
      <div class="d-flex justify-content-center">
        <button
          v-if="chosenIntroType.length > 0"
          class="btn btn-primary"
          @click="saveIntroTypeAndContinue(userInputSlot)"
        >
          {{ introOptions[chosenIntroType].submitText }}
        </button>
      </div>
    </UserInput>
    <div v-if="presentationPlanStore.introductionType.length > 0">
      <!-- Second text block explaining how to work with the chosen introType -->
      <TextBlocks
        :chapter-i-d="2"
        :texts="texts2BasedOnIntroType[chosenIntroType]"
      />
      <!-- ContentCollector for collecting the user's plan for the introduction -->
      <UserInput
        :chapter-i-d="3"
        :heading="introOptions[chosenIntroType].contentBoxText"
        button-text="I'm done"
        ><div class="row justify-content-md-center">
          <div class="col-5">
            <ContentCollector
              :all-content-to-display="introductionContent"
              :content-box-heading="
                introOptions[chosenIntroType].contentBoxText
              "
              @add="presentationPlanStore.addIntroductionContent"
              @remove="presentationPlanStore.removeFromIntroductionContent"
            />
          </div>
        </div>
      </UserInput>
    </div>
  </ChatInterface>
</template>
