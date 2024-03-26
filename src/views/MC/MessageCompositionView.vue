<script>
  import ProgressBar from '@/components/ProgressBar.vue'
  import AudienceBeginningView from '@/views/MC/AudienceBeginningView.vue'
  import AudienceEndView from '@/views/MC/AudienceEndView.vue'
  import IntroductionView from '@/views/MC/IntroductionView.vue'
  import EndView from '@/views/MC/EndView.vue'
  import MiddleView from './MiddleView.vue'
  import SummaryView from './SummaryView.vue'

  // @vuese
  // @group Views
  // The MessageCompositionView is the root view containing all other elements of the message composition software
  export default {
    name: 'MessageCompositionView',
    components: {
      ProgressBar,
      AudienceBeginningView,
      AudienceEndView,
      IntroductionView,
      EndView,
      SummaryView
    }
  }
</script>

<script setup>
  import { useProgressStore } from '@/stores/MC/ProgressStore'

  const progressStore = useProgressStore()
  const { nextStep } = progressStore
  const { previousStep } = progressStore
</script>

<template>
  <div class="container mt-5 mx-auto h-100">
    <!-- HEADER -->
    <ProgressBar />

    <!-- BODY -->

    <AudienceBeginningView
      v-if="progressStore.isCurrentByAbbreviation('Before')"
    />
    <AudienceEndView v-if="progressStore.isCurrentByAbbreviation('After')" />
    <IntroductionView v-if="progressStore.isCurrentByAbbreviation('Intro')" />
    <EndView v-if="progressStore.isCurrentByAbbreviation('End')" />
    <MiddleView v-if="progressStore.isCurrentByAbbreviation('Middle')" />
    <SummaryView v-if="progressStore.isCurrentByAbbreviation('S')" />

    <!-- FOOTER -->
    <div
      class="d-flex justify-content-center gap-2 align-self-end fixed-bottom mb-3"
    >
      <button class="btn btn-outline-primary" @click="previousStep()">
        Back
      </button>
      <button class="btn btn-outline-primary" @click="nextStep()">Next</button>
    </div>
  </div>
</template>

<style scoped></style>
