<script>
  import MessageCompositionView from './views/MessageCompositionView.vue'

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
  <div class="container mt-5">
    <MessageCompositionView />
  </div>
</template>

<style scoped></style>
