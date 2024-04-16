<script setup>
  /**
   * The MessageCompositionView is the root view containing all other elements of the message composition software
   */
  import ProgressBar from '@/components/ProgressBar.vue'
  import AudienceBeginningView from '@/views/MC/AudienceBeginningView.vue'
  import AudienceEndView from '@/views/MC/AudienceEndView.vue'
  import IntroductionView from '@/views/MC/IntroductionView.vue'
  import EndView from '@/views/MC/EndView.vue'
  import MiddleView from './MiddleView.vue'
  import SummaryView from './SummaryView.vue'
  import { useProgressStore } from '@/stores/MC/ProgressStore'

  const progressStore = useProgressStore()
</script>

<template>
  <div class="container mt-5">
    <!-- HEADER -->
    <div class="sticky-top p-3 bg-white">
      <ProgressBar />
    </div>

    <!-- BODY -->

    <!-- If we want the content to appear on the bottom, uncomment the next line 
      + line below marked with CONTENT_BOTTOM_2
    <div class="d-flex align-items-bottom flex-column fixed-bottom mb-5"> -->
    <WelcomeView v-if="progressStore.isCurrentByAbbreviation('Welcome')" />
    <AudienceBeginningView
      v-if="progressStore.isCurrentByAbbreviation('Before')"
    />
    <AudienceEndView v-if="progressStore.isCurrentByAbbreviation('After')" />
    <IntroductionView v-if="progressStore.isCurrentByAbbreviation('Intro')" />
    <EndView v-if="progressStore.isCurrentByAbbreviation('End')" />
    <MiddleView v-if="progressStore.isCurrentByAbbreviation('Middle')" />
    <SummaryView v-if="progressStore.isCurrentByAbbreviation('S')" />
  </div>
  <!-- CONTENT_BOTTOM_2
    </div> -->
</template>

<style scoped></style>
