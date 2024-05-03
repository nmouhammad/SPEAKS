<script setup>
  import { storeToRefs } from 'pinia'
  import ThreePanes from '@/components/ThreePanes.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore.js'
  import { useAudienceStore } from '@/stores/MC/AudienceStore'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++

  const presentationPlanStore = usePresentationPlanStore()
  const { introductionContent, endContent, middleContent } = storeToRefs(
    presentationPlanStore
  )
  const chapterProgressStore = useChapterProgressStore()

  const audienceStore = useAudienceStore()

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const texts1 = [
    'Now you have created your full pitch plan. Good job! 💪',
    "In a moment I'll show you a full overview of your plan. Afterwards I'll ask you to download your data and fill out a survey.",
    "Please don't skip the survey, your opinion is really important for us and our research."
    // 'But before I show you an overview of your plan, we need something from you 😋',
    // 'We need your help for our research!',
    // 'Please click on the button below to download a file containing information on how you used this application and save it on your laptop. <br> We will in a few moments ask you to upload it when you fill out the survey.'
  ]
  const texts2 = [
    'Please click on the button below to download a file containing information on how you used this application and save it on your laptop. <br> We will in a few moments ask you to upload it when you fill out the survey.'
  ]

  const texts3 = [
    'Thank you!',
    'We would also like to ask you to fill out a survey about your usage experience with this part of the software. In this questionnaire you will also be asked to upload the file you just downloaded.',
    'All data will be saved on a server of our institute, anonymized and only used for research purposes.'
  ]
  const texts4 = ['Thank you, this helped us a lot!']

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [3, 1, 3, 1, 1]

  /**
   * Exports the data from the audienceStore and the presentationPlanStore
   * to a JSON-file the user can save locally
   */
  function exportToJSON(userInputSlot) {
    const data = {
      AudienceStore: audienceStore.$state,
      PresentationPlanStore: presentationPlanStore.$state,
      ChapterProgressStore: chapterProgressStore.$state
    }
    const dataJSON = JSON.stringify(data, undefined, 4)

    var a = document.createElement('a')
    var file = new Blob([dataJSON], { type: JSON })
    a.href = URL.createObjectURL(file)
    a.download = 'My_presentation_plan.presentable'
    a.click()

    userInputSlot.stopWaiting()
  }
</script>

<template>
  <ChatInterface
    :nr-of-elements-in-chapter="nrOfElementsInChapter"
    step-abbreviation="S"
  >
    <TextBlocks :chapter-i-d="0" :texts="texts1" />

    <UserInput
      :chapter-i-d="1"
      heading="Overview of your full presentation plan:"
      :custom-button="true"
    >
      <ThreePanes>
        <template #left-pane>
          <ContentBox
            :content-elements="introductionContent"
            :has-remove-option="false"
            content-box-heading="Introduction"
          />
        </template>
        <template #middle-pane>
          <ContentBox
            :content-elements="middleContent"
            :has-remove-option="false"
            content-box-heading="Middle"
          />
        </template>
        <template #right-pane>
          <ContentBox
            :content-elements="endContent"
            :has-remove-option="false"
            content-box-heading="End"
          />
        </template>
      </ThreePanes>
    </UserInput>
    <TextBlocks :chapter-i-d="1" :texts="texts2" />
    <UserInput
      v-slot="userInputSlot"
      :chapter-i-d="1"
      heading="Download the usage data:"
      :custom-button="true"
    >
      <button class="btn btn-primary mt-3" @click="exportToJSON(userInputSlot)">
        Download data
      </button>
    </UserInput>
    <TextBlocks :chapter-i-d="2" :texts="texts3" />
    <UserInput
      :chapter-i-d="3"
      heading="Fill out the survey here:"
      button-text="I'm done"
    >
      <div>
        <a
          :href="
            'https://limesurvey.svc.educs-hosting.net/index.php/868297?lang=en&ResearchID=' +
            presentationPlanStore.researchID
          "
          target="_blank"
          >https://limesurvey.svc.educs-hosting.net/index.php/868297?lang=en&ResearchID={{
            presentationPlanStore.researchID
          }}</a
        >
      </div>
    </UserInput>
    <TextBlocks :chapter-i-d="4" :texts="texts4" />
  </ChatInterface>
</template>
