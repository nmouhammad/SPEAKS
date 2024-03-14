<script>
  /**
   * Provides three equally-sized panes which can then be filled with content
   */
  export default {
    name: 'ThreePanes'
  }
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <!-- We have a row with three equally sized columns, each column is used as one of the 
        panes where content will be shown step by step -->
      <div class="col-4 align-self-center">
        <!-- left pane -->
        <slot name="left-pane"></slot>
      </div>
      <div class="col-4">
        <!-- middle pane -->
        <slot name="middle-pane"></slot>
      </div>
      <div class="col-4 align-self-center">
        <!-- right pane -->
        <slot name="right-pane"></slot>
      </div>
    </div>
  </div>
</template>
