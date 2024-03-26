<script>
  import MessageCompositionView from './views/MC/MessageCompositionView.vue'

  // @vuese
  // @group Views
  // Main view, this should contain only the MessageCompositionView, everything else is done there
  export default {
    name: 'App',
    components: {
      MessageCompositionView
    }
  }
</script>

<template>
  <MessageCompositionView />
</template>

<style scoped></style>
