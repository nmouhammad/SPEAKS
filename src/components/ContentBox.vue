<script>
  // A box displaying the content that is given to it by its parent with one badge each
  // @group Components
  export default {
    name: 'ContentBox',
    props: {
      // Array containing the elements that should be shown
      contentElements: {
        type: Object,
        default() {
          return {}
        }
      },
      // Whether there is an "x" on each badge for removing this content
      hasRemoveOption: {
        type: Boolean,
        default: true
      },
      // The heading of the box displaying the content
      contentBoxHeading: {
        type: String,
        required: true
      }
    },
    emits: [
      // @vuese
      // sends object containing the id of the content to be removed ("toRemove") to the parent
      'remove'
    ]
  }
</script>
<script setup>
  import draggable from 'vuedraggable'
</script>

<template>
  <div class="card w-100">
    <div class="card-header">{{ contentBoxHeading }}</div>
    <div class="card-body">
      <draggable
        :list="contentElements.contentElements"
        item-key="text"
        ghost-class="ghost"
        :move="checkMove"
      >
        <template #item="{ element }">
          <span
            :key="element.id"
            class="badge text-secondary fw-normal fs-6 border border-primary border-1 m-1"
            >{{ element.text }}
            <button
              v-if="hasRemoveOption"
              class="btn btn-close btn-sm"
              aria-label="Remove"
              @click="$emit('remove', element.id)"
            ></button>
          </span>
        </template>
      </draggable>

      <!-- <span
        v-for="content in contentElements.contentElements"
        :key="content.id"
        class="badge text-secondary fw-normal fs-6 border border-primary border-1 m-1"
        >{{ content.text }}
        <button
          v-if="hasRemoveOption"
          class="btn btn-close btn-sm"
          aria-label="Remove"
          @click="$emit('remove', { toRemove: id })"
        ></button>
      </span> -->
    </div>
  </div>
</template>

<style scoped></style>
