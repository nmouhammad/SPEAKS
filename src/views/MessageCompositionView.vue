<script>
  import ProgressBar from '@/components/ProgressBar.vue'
  import AudienceBeginningView from '@/views/AudienceBeginningView.vue'
  import AudienceEndView from '@/views/AudienceEndView.vue'
  import IntroductionView from '@/views/IntroductionView.vue'
  import EndView from '@/views/EndView.vue'
  import MiddleView from './MiddleView.vue'

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
      EndView
    }
  }
</script>

<script setup>
  import { useProgressStore } from '@/stores/ProgressStore'

  const progressStore = useProgressStore()
  const { nextStep } = progressStore
  const { previousStep } = progressStore
</script>

<template>
  <div class="container mt-5 mx-auto h-100">
    <!-- HEADER -->
    <ProgressBar />

    <!-- BODY -->

    <AudienceBeginningView v-if="progressStore.isCurrentByAbbreviation('AB')" />
    <AudienceEndView v-if="progressStore.isCurrentByAbbreviation('AE')" />
    <IntroductionView v-if="progressStore.isCurrentByAbbreviation('I')" />
    <EndView v-if="progressStore.isCurrentByAbbreviation('E')" />
    <MiddleView v-if="progressStore.isCurrentByAbbreviation('M')" />

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
