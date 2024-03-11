<script>
  import SubstepsViewer from '@/components/SubstepsViewer.vue'

  // @vuese
  // @group Views
  // This view guides the user through creating the introduction
  export default {
    name: 'IntroductionView',
    components: {
      SubstepsViewer
    }
  }
</script>

<template>
  <p>Introduction</p>
  <SubstepsViewer text="example text" />
</template>
