<script setup>
  import { defineEmits } from 'vue'
  /**
   * A box displaying the content that is given to it by its parent with one badge each
   */
  import draggable from 'vuedraggable'

  const props = defineProps({
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
  })

  const emit = defineEmits([
    'remove' // sends object containing the id of the content to be removed ("toRemove") to the parent
  ])
</script>

<template>
  <div class="card w-100">
    <div class="card-header">{{ props.contentBoxHeading }}</div>
    <div class="card-body">
      <draggable
        :list="props.contentElements.contentElements"
        item-key="text"
        ghost-class="ghost"
      >
        <template #item="{ element }">
          <span
            :key="element.id"
            class="badge text-secondary fw-normal fs-6 border border-primary border-1 m-1"
            >{{ element.text }}
            <button
              v-if="props.hasRemoveOption"
              class="btn btn-close btn-sm"
              aria-label="Remove"
              @click="emit('remove', element.id)"
            ></button>
          </span>
        </template>
      </draggable>
    </div>
  </div>
</template>

<style scoped></style>
