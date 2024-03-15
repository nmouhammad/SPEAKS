<script setup>
  import { storeToRefs } from 'pinia'
  import ThreePanes from '@/components/ThreePanes.vue'
  import ContentBox from '@/components/ContentBox.vue'
  import { usePresentationPlanStore } from '@/stores/PresentationPlanStore.js'

  const PresentationPlanStore = usePresentationPlanStore()
  const { introductionContent, endContent, middleContent } = storeToRefs(
    PresentationPlanStore
  )
</script>

<template>
  <h2 class="h2 mt-5 text-center">Your full presentation plan:</h2>
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
</template>
