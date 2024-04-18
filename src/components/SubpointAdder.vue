<script setup>
  /** A component that can be used if subpoints should be added. It consists of a
   * textfield and a button "Add."
   */

  import { ref } from 'vue'
  import { useChapterProgressStore } from '@/stores/MC/ChapterProgressStore'
  import { storeToRefs } from 'pinia'
  const content = ref('')
  const emit = defineEmits(['add'])

  /**
   * Checks if there is something except whitespace in content, if yes
   *    it emits that content to the parent and cleans the textfield
   * called when the user is clicking "Add"
   */
  function addContent() {
    const contentToAdd = content.value.trim()
    if (contentToAdd !== '') {
      // sends content of the textfield to parent when "Add" is clicked
      // @arg an object containing the content of the textfield
      emit('add', contentToAdd)
      content.value = ''
    }
  }

  const chapterProgressStore = useChapterProgressStore()
  const { cursorInsideTextfield } = storeToRefs(chapterProgressStore)

  function cursorEntersTextfield() {
    cursorInsideTextfield.value = true
  }

  function cursorLeavesTextfield() {
    cursorInsideTextfield.value = false
  }
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-10 p-0">
        <input
          v-model="content"
          type="text"
          class="form-control"
          aria-label="Previous knowledge of the audience"
          @keyup.enter="addContent"
          @focus="cursorEntersTextfield"
          @blur="cursorLeavesTextfield"
        />
      </div>
      <div class="col-2 p-0 ps-2">
        <button class="btn btn-primary w-100" @click.prevent="addContent">
          Add
        </button>
      </div>
    </div>
  </div>
</template>
