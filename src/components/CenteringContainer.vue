<script>
  /**
   * A simple container centering it's content in the middle with 50% display width
   */
  export default {
    name: 'CenteringContainer'
  }
</script>

<template>
  <div class="container d-flex flex-column align-items-center gap-3 w-50 mt-5">
    <!-- @slot the content that should be centered -->
    <slot />
  </div>
</template>
