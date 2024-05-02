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
  import CenteringCol5 from '@/components/CenteringCol5.vue'
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
    'Many people waste this chance by starting with <i>"Hello my name is Presentable and today we talk about parrots. This is my schedule. First, we start with ..." </i>',
    'See how everyone is already falling asleep or looking at their phones? 😴',
    "Let's make sure this won't happen to you!",
    "The good news is: there are multiple great options how to gain the audience's interest. Just pick what feels like the best match for you and this presentation!"
  ]

  // Object containing the different options that users can choose for the introduction
  const introOptions = {
    story: {
      text: 'Tell a story',
      description:
        "People love to hear stories. If you kick off your pitch with an interesting story, you'll draw your audience in and make them more intrigued by the topic.",
      submitText: 'I want to start with a story',
      contentBoxText: 'Content of your story'
    },
    fact: {
      text: 'Tell an impressive fact',
      description:
        "Open your pitch with an attention-grabbing fact about your topic, something that's both surprising and unfamiliar to your audience. This unexpected revelation will instantly intrigue them and make them more receptive to your message.",
      submitText: 'I want to start with a fact',
      contentBoxText: 'Presentation of your fact'
    },
    question: {
      text: 'Ask a question',
      description:
        'Captivate your audience with a thought-provoking question related to your topic. This will prompt them to start thinking and fuel their desire to learn more.',
      submitText: 'I want to start with a question',
      contentBoxText: 'Presentation of your question'
    },
    other: {
      text: 'I already have another idea',
      description:
        "You have an idea about how to capture your audience's attention that is not in the list? Great! Authenticity is key, so please continue with this idea.",
      submitText: 'I want to start with my own idea',
      contentBoxText: 'Presentation of your own idea to start the presentation'
    }
  }

  // the texts that will be shown after the introType has been chosen
  // HINT: if in the end one of these text-arrays has a different
  // number of elements than the other, the method that is called
  // when choosing the introType needs to adapt the nrOfElementsInChapter
  // in the store
  const texts2BasedOnIntroType = {
    story: [
      'Do you already have a story you could tell the audience? Great! If not, think about the problem you are solving in your resarch and in which real-life situation this problem appears.',
      "If possible, choose a story that is somehow relevant to your audience e.g. because it's a story somehow related to their lives or their interest. Also funny stories tend to work well.",
      "<p>I think I'll start my pitch with the following story: </p> <i> - a parrot, called Yosuke, once flew out of his cage and got lost <br> - do you know how he got back home? <br> - he told his full address to a vet who then helped him to get back <br> - are parrots maybe not only mimicking human language? Is there more to it? </i>"
    ],
    fact: [
      "To choose an appropriate fact, think about which facts about you're topic are important for what you want to transmit in the pitch.",
      'Then choose that fact that is probably most unknown but interesting to the audience.',
      "<p>I think I'll start my pitch with the following facts: </p> <i> - when parrots talk one might assume they would just mimick human language <br> - but they have the cognitive abilities of a young child and can actually develop understanding of human language <br> - they do so because they are highly social creatures wanting to bond with the humans around them</i>"
    ],
    question: [
      'To find a good question to start with, think about the main point you want to transmit in your elevator pitch (i.e. what your audience should learn).',
      'Then think about a way that you can create a question related to this main point that is interesting and will make the audience think.',
      "<p>I think I will start my pitch with the following questions: </p> <i>- Did you ever hear a parrot talk? <br> - What if I told you that teaching a parrot to talk isn't just about entertainment but a journey of mutual understanding and connection?</i>"
    ],
    other: [
      "Great that you have a good idea to get your audience's interest already!",
      'Please enter it below:',
      "(This time I don't have an example for you)"
    ]
  }

  const texts3 = [
    'Now, after you made sure you got the interest of the audience, would then be a good time to introduce yourself. 👋'
  ]

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

  const nrOfElementsInChapter = [7, 1, 3, 1, 1]
</script>

<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="Intro"
  >
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
        ><CenteringCol5>
          <ContentCollector
            :all-content-to-display="introductionContent"
            :content-box-heading="introOptions[chosenIntroType].contentBoxText"
            @add="presentationPlanStore.addIntroductionContent"
            @remove="presentationPlanStore.removeFromIntroductionContent"
          />
        </CenteringCol5>
      </UserInput>
      <TextBlocks :chapter-i-d="4" :texts="texts3" />
    </div>
  </ChatInterface>
</template>
