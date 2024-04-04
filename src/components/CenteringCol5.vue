<script setup>
  /**
   * Centers the content with col-5 width.
   */
</script>

<template>
  <div class="row justify-content-md-center">
    <div class="col-5">
      <!-- @slot The content that should be centered -->
      <slot></slot>
    </div>
  </div>
</template>
