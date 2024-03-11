<script>
  import ProgressBar from '@/components/ProgressBar.vue'
  import AudienceBeginningView from '@/views/AudienceBeginningView.vue'
  import AudienceEndView from '@/views/AudienceEndView.vue'
  import IntroductionView from '@/views/IntroductionView.vue'

  // @vuese
  // @group Views
  // The MessageCompositionView is the root view containing all other elements of the message composition software
  export default {
    name: 'MessageCompositionView',
    components: {
      ProgressBar,
      AudienceBeginningView,
      AudienceEndView,
      IntroductionView
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
    <div
      class="container d-flex flex-column align-items-center gap-3 w-50 mt-5"
    >
      <AudienceBeginningView
        v-if="progressStore.isCurrentByAbbreviation('AB')"
      />
      <AudienceEndView v-if="progressStore.isCurrentByAbbreviation('AE')" />
      <IntroductionView v-if="progressStore.isCurrentByAbbreviation('I')" />
    </div>

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
