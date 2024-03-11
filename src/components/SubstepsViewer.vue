<script>
  // @vuese
  // @group Components
  // If one view (e.g. Introduction) has different substeps, this component can be used
  // to display one of the substeps at a time
  export default {
    props: {
      // the text that should be displayed
      text: {
        type: String,
        required: true
      }
    }
  }
</script>
<template>
  <p>{{ text }}</p>
</template>
