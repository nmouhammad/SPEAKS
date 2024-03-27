<script setup>
  /**
   * Display the content of the slot in a speech bubble
   */
  const props = defineProps({
    /**
     * Whether a triangle should be shown on the left of the speech bubble
     */
    showTriangle: {
      type: Boolean,
      default: true
    }
  })
</script>

<template>
  <div
    class="text-center speech-bubble my-1"
    :class="{ 'speech-bubble-with-triangle': props.showTriangle }"
  >
    <!-- @slot the content that will be shown inside the speech bubble -->
    <slot></slot>
  </div>
</template>

<style scoped>
  /* based upon: https://github.com/nazimkazim/duolingo-like-interface/blob/master/style.css */

  .speech-bubble {
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    min-width: 254px;
    min-height: 67px;
    /* background-color: crimson; */
    border-radius: 10px;
    border: 3px rgba(var(--bs-light-rgb)) solid;
  }

  .speech-bubble-with-triangle:before {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid rgba(var(--bs-light-rgb));
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    top: 25px;
    left: -23px;
  }

  .speech-bubble-with-triangle:after {
    content: '';
    width: 0px;
    height: 0px;
    position: absolute;
    border-left: 10px solid transparent;
    border-right: 10px solid #fff;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    top: 25px;
    left: -18px;
  }
</style>
