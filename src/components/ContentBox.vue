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
      },
      // Whether there is an "x" on each badge for removing this content
      hasRemoveOption: {
        type: Boolean,
        default: true
      }
    },
    emits: [
      // @vuese
      // sends object containing the id of the content to be removed ("toRemove") to the parent
      'remove'
    ]
  }
</script>

<template>
  <div class="card w-100">
    <div class="card-header">Previous knowledge of your audience:</div>
    <div class="card-body">
      <span
        v-for="(content, id) in contentElements"
        :key="id"
        class="badge text-secondary fw-normal fs-6 border border-primary border-1 m-1"
        >{{ content }}
        <button
          v-if="hasRemoveOption"
          class="btn btn-close btn-sm"
          aria-label="Remove"
          @click="$emit('remove', { toRemove: id })"
        ></button>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
