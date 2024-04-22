<script setup>
  import { storeToRefs } from 'pinia'
  import ThreePanes from '@/components/ThreePanes.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import ChatInterface from '@/components/ChatInterface.vue'
  import TextBlocks from '@/components/TextBlocks.vue'
  import UserInput from '@/components/UserInput.vue'
  import { usePresentationPlanStore } from '@/stores/MC/PresentationPlanStore.js'
  import { useAudienceStore } from '@/stores/MC/AudienceStore'

  // +++++++++++++++++++++++
  // ++++ Import stores ++++
  // +++++++++++++++++++++++

  const presentationPlanStore = usePresentationPlanStore()
  const { introductionContent, endContent, middleContent } = storeToRefs(
    presentationPlanStore
  )

  const audienceStore = useAudienceStore()

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Define content (e.g. text messages) that will be shown ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  const texts1 = [
    'Now you have created your full presentation plan. Good job! 💪',
    'Here is an overview of your plan:'
  ]

  // ++++++++++++++++++++++++++++++++++++++++++++++
  // ++++ Additional variables & functionality ++++
  // ++++++++++++++++++++++++++++++++++++++++++++++

  const nrOfElementsInChapter = [2, 1]

  /**
   * Exports the data from the audienceStore and the presentationPlanStore
   * to a JSON-file the user can save locally
   */
  function exportToJSON() {
    const data = {
      AudienceStore: audienceStore,
      PresentationPlanStore: presentationPlanStore
    }
    const dataJSON = JSON.stringify(data, undefined, 4)

    var a = document.createElement('a')
    var file = new Blob([dataJSON], { type: JSON })
    a.href = URL.createObjectURL(file)
    a.download = 'Presentable_Export.json'
    a.click()
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
          <button class="btn btn-primary mt-3" @click="exportToJSON">
            Export to JSON
          </button>
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
  </ChatInterface>
</template>
