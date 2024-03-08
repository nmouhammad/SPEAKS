<script>
  // A box displaying the content that is given to it by its parent with one badge each
  // @group Components
  export default {
    name: 'ContentBox',
    props: {
      // Array containing the elements that should be shown
      contentElements: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<template>
  <div class="card">
    <div class="card-header">Previous knowledge of your audience:</div>
    <div class="card-body">
      <!-- Your card content here -->
      <span
        v-for="(content, id) in contentElements"
        :key="id"
        class="badge text-secondary fw-normal fs-6 border border-primary border-1 m-1"
        >{{ content }}</span
      >
    </div>
  </div>
</template>

<style scoped></style>
